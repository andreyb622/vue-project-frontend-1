<template>
  <div class="relative w-full">
    <!-- Label -->
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
    </label>

    <!-- Search Mode Input -->
    <div v-if="searchMode" class="relative">
      <input
        ref="searchInput"
        v-model="searchQuery"
        type="text"
        :placeholder="placeholder || 'Search options...'"
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
        @focus="openDropdown"
        @blur="handleBlur"
        @keydown="handleKeydown"
      />
      
      <!-- Selected items display for multi-select in search mode -->
      <div v-if="multi && selectedOptions.length > 0" class="mt-2 flex flex-wrap gap-1">
        <span
          v-for="option in selectedOptions"
          :key="option.id"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
        >
          {{ option.value }}
          <button
            @click="removeOption(option)"
            class="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600 focus:outline-none"
          >
            ×
          </button>
        </span>
      </div>
    </div>

    <!-- Regular Select Mode -->
    <div v-else class="relative">
      <button
        ref="selectButton"
        type="button"
        class="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        @click="toggleDropdown"
        @keydown="handleKeydown"
      >
        <span class="block truncate">
          {{ displayValue }}
        </span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <svg
            class="h-5 w-5 text-gray-400 transition-transform duration-200"
            :class="{ 'rotate-180': isOpen }"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>
    </div>

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-auto"
    >
      <ul class="py-1">
        <li
          v-for="option in filteredOptions"
          :key="option.id"
          class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
          :class="{
            'bg-blue-50': isSelected(option),
            'text-blue-900': isSelected(option),
            'text-gray-900': !isSelected(option)
          }"
          @click="selectOption(option)"
        >
          <span class="block truncate" :class="{ 'font-medium': isSelected(option) }">
            {{ option.value }}
          </span>
          
          <!-- Checkmark for selected items -->
          <span
            v-if="isSelected(option)"
            class="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600"
          >
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </li>
        
        <!-- No options message -->
        <li v-if="filteredOptions.length === 0" class="py-2 pl-3 pr-9 text-gray-500">
          No options found
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'

export default {
  name: 'CustomSelect',
  props: {
    // Array of options with {id: string, value: string} structure
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    // Current value - can be single option or array of options
    modelValue: {
      type: [Object, Array],
      default: null
    },
    // Enable multi-select mode
    multi: {
      type: Boolean,
      default: false
    },
    // Enable search mode
    searchMode: {
      type: Boolean,
      default: false
    },
    // Label for the select
    label: {
      type: String,
      default: ''
    },
    // Placeholder text
    placeholder: {
      type: String,
      default: 'Select an option...'
    },
    // Disabled state
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const isOpen = ref(false)
    const searchQuery = ref('')
    const searchInput = ref(null)
    const selectButton = ref(null)

    // Computed properties
    const selectedOptions = computed(() => {
      if (!props.modelValue) return []
      if (props.multi) {
        return Array.isArray(props.modelValue) ? props.modelValue : []
      }
      return props.modelValue ? [props.modelValue] : []
    })

    const filteredOptions = computed(() => {
      if (!props.searchMode || !searchQuery.value) {
        return props.options
      }
      return props.options.filter(option =>
        option.value.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    })

    const displayValue = computed(() => {
      if (props.multi) {
        if (selectedOptions.value.length === 0) {
          return props.placeholder
        }
        return selectedOptions.value.map(option => option.value).join(', ')
      } else {
        return selectedOptions.value.length > 0 
          ? selectedOptions.value[0].value 
          : props.placeholder
      }
    })

    // Methods
    const isSelected = (option) => {
      return selectedOptions.value.some(selected => selected.id === option.id)
    }

    const selectOption = (option) => {
      if (props.multi) {
        const newSelection = [...selectedOptions.value]
        const existingIndex = newSelection.findIndex(item => item.id === option.id)
        
        if (existingIndex > -1) {
          // Remove if already selected
          newSelection.splice(existingIndex, 1)
        } else {
          // Add if not selected
          newSelection.push(option)
        }
        
        emit('update:modelValue', newSelection)
      } else {
        emit('update:modelValue', option)
        closeDropdown()
      }
    }

    const removeOption = (option) => {
      if (props.multi) {
        const newSelection = selectedOptions.value.filter(item => item.id !== option.id)
        emit('update:modelValue', newSelection)
      }
    }

    const openDropdown = () => {
      if (!props.disabled) {
        isOpen.value = true
      }
    }

    const closeDropdown = () => {
      isOpen.value = false
      if (props.searchMode) {
        searchQuery.value = ''
      }
    }

    const toggleDropdown = () => {
      if (isOpen.value) {
        closeDropdown()
      } else {
        openDropdown()
      }
    }

    const handleBlur = () => {
      // Delay closing to allow for option selection
      setTimeout(() => {
        closeDropdown()
      }, 150)
    }

    const handleKeydown = (event) => {
      switch (event.key) {
        case 'Escape':
          closeDropdown()
          break
        case 'Enter':
          if (props.searchMode && filteredOptions.value.length > 0) {
            selectOption(filteredOptions.value[0])
          }
          break
        case 'ArrowDown':
          event.preventDefault()
          if (!isOpen.value) {
            openDropdown()
          }
          break
        case 'ArrowUp':
          event.preventDefault()
          if (!isOpen.value) {
            openDropdown()
          }
          break
      }
    }

    // Handle clicks outside the component
    const handleClickOutside = (event) => {
      const selectElement = props.searchMode ? searchInput.value : selectButton.value
      if (selectElement && !selectElement.contains(event.target) && !event.target.closest('.absolute.z-10')) {
        closeDropdown()
      }
    }

    // Lifecycle
    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    // Watch for search mode changes
    watch(() => props.searchMode, (newVal) => {
      if (newVal) {
        nextTick(() => {
          if (searchInput.value) {
            searchInput.value.focus()
          }
        })
      }
    })

    return {
      isOpen,
      searchQuery,
      searchInput,
      selectButton,
      selectedOptions,
      filteredOptions,
      displayValue,
      isSelected,
      selectOption,
      removeOption,
      openDropdown,
      closeDropdown,
      toggleDropdown,
      handleBlur,
      handleKeydown
    }
  }
}
</script>

<style scoped>
/* Additional custom styles can be added here if needed */
</style>