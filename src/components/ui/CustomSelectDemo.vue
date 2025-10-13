<template>
  <div class="max-w-4xl mx-auto p-8 space-y-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Custom Select Component Demo</h1>
    
    <!-- Single Select (Regular Mode) -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Single Select - Regular Mode</h2>
      <div class="max-w-md">
        <CustomSelect
          v-model="singleValue"
          :options="options"
          label="Choose a fruit"
          placeholder="Select a fruit..."
        />
      </div>
      <div class="mt-4 p-3 bg-gray-100 rounded">
        <strong>Selected:</strong> 
        <code>{{ singleValue ? JSON.stringify(singleValue, null, 2) : 'None' }}</code>
      </div>
    </div>

    <!-- Multi Select (Regular Mode) -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Multi Select - Regular Mode</h2>
      <div class="max-w-md">
        <CustomSelect
          v-model="multiValue"
          :options="options"
          :multi="true"
          label="Choose multiple fruits"
          placeholder="Select fruits..."
        />
      </div>
      <div class="mt-4 p-3 bg-gray-100 rounded">
        <strong>Selected:</strong> 
        <code>{{ multiValue.length > 0 ? JSON.stringify(multiValue, null, 2) : 'None' }}</code>
      </div>
    </div>

    <!-- Single Select (Search Mode) -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Single Select - Search Mode</h2>
      <div class="max-w-md">
        <CustomSelect
          v-model="singleSearchValue"
          :options="largeOptions"
          :search-mode="true"
          label="Search for a country"
          placeholder="Type to search countries..."
        />
      </div>
      <div class="mt-4 p-3 bg-gray-100 rounded">
        <strong>Selected:</strong> 
        <code>{{ singleSearchValue ? JSON.stringify(singleSearchValue, null, 2) : 'None' }}</code>
      </div>
    </div>

    <!-- Multi Select (Search Mode) -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Multi Select - Search Mode</h2>
      <div class="max-w-md">
        <CustomSelect
          v-model="multiSearchValue"
          :options="largeOptions"
          :multi="true"
          :search-mode="true"
          label="Search for multiple countries"
          placeholder="Type to search and select countries..."
        />
      </div>
      <div class="mt-4 p-3 bg-gray-100 rounded">
        <strong>Selected:</strong> 
        <code>{{ multiSearchValue.length > 0 ? JSON.stringify(multiSearchValue, null, 2) : 'None' }}</code>
      </div>
    </div>

    <!-- Display Values as Comma-Separated String -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Display Selected Values</h2>
      <div class="space-y-4">
        <div>
          <strong>Single Select Value:</strong> 
          <span class="text-blue-600">{{ singleValue?.value || 'None selected' }}</span>
        </div>
        <div>
          <strong>Multi Select Values (Comma-separated):</strong> 
          <span class="text-blue-600">{{ 
            multiValue.length > 0 
              ? multiValue.map(item => item.value).join(', ') 
              : 'None selected' 
          }}</span>
        </div>
        <div>
          <strong>Search Single Value:</strong> 
          <span class="text-blue-600">{{ singleSearchValue?.value || 'None selected' }}</span>
        </div>
        <div>
          <strong>Search Multi Values (Comma-separated):</strong> 
          <span class="text-blue-600">{{ 
            multiSearchValue.length > 0 
              ? multiSearchValue.map(item => item.value).join(', ') 
              : 'None selected' 
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import CustomSelect from './CustomSelect.vue'

export default {
  name: 'CustomSelectDemo',
  components: {
    CustomSelect
  },
  setup() {
    // Sample data
    const options = ref([
      { id: '1', value: 'Apple' },
      { id: '2', value: 'Banana' },
      { id: '3', value: 'Cherry' },
      { id: '4', value: 'Date' },
      { id: '5', value: 'Elderberry' },
      { id: '6', value: 'Fig' },
      { id: '7', value: 'Grape' },
      { id: '8', value: 'Honeydew' }
    ])

    const largeOptions = ref([
      { id: 'us', value: 'United States' },
      { id: 'ca', value: 'Canada' },
      { id: 'mx', value: 'Mexico' },
      { id: 'uk', value: 'United Kingdom' },
      { id: 'fr', value: 'France' },
      { id: 'de', value: 'Germany' },
      { id: 'it', value: 'Italy' },
      { id: 'es', value: 'Spain' },
      { id: 'jp', value: 'Japan' },
      { id: 'kr', value: 'South Korea' },
      { id: 'cn', value: 'China' },
      { id: 'in', value: 'India' },
      { id: 'au', value: 'Australia' },
      { id: 'nz', value: 'New Zealand' },
      { id: 'br', value: 'Brazil' },
      { id: 'ar', value: 'Argentina' },
      { id: 'za', value: 'South Africa' },
      { id: 'eg', value: 'Egypt' },
      { id: 'ng', value: 'Nigeria' },
      { id: 'ru', value: 'Russia' }
    ])

    // Reactive values
    const singleValue = ref(null)
    const multiValue = ref([])
    const singleSearchValue = ref(null)
    const multiSearchValue = ref([])

    return {
      options,
      largeOptions,
      singleValue,
      multiValue,
      singleSearchValue,
      multiSearchValue
    }
  }
}
</script>

<style scoped>
/* Additional styles if needed */
</style>