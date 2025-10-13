# Custom Select Component

A highly customizable Vue 3 select component built with TypeScript, Composition API, and Tailwind CSS. Supports both single and multi-select modes, with optional search functionality.

## Features

- ✅ **Single Select Mode**: Traditional dropdown selection
- ✅ **Multi Select Mode**: Select multiple options with visual chips
- ✅ **Search Mode**: Filter options with a search input
- ✅ **TypeScript Support**: Full type safety with proper interfaces
- ✅ **Composition API**: Built with Vue 3's script setup syntax
- ✅ **Tailwind CSS**: Modern, responsive styling
- ✅ **Keyboard Navigation**: Arrow keys, Enter, and Escape support
- ✅ **Click Outside**: Automatically closes dropdown when clicking outside
- ✅ **Accessibility**: Proper ARIA attributes and semantic HTML

## Installation

The component is located in `src/components/ui/CustomSelect.vue` and can be imported directly:

```typescript
import CustomSelect from '@/components/ui/CustomSelect.vue'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectOption[]` | `[]` | Array of options with `{id: string, value: string}` structure |
| `modelValue` | `SelectOption \| SelectOption[] \| null` | `null` | Current selected value(s) |
| `multi` | `boolean` | `false` | Enable multi-select mode |
| `searchMode` | `boolean` | `false` | Enable search input instead of dropdown button |
| `label` | `string` | `''` | Label text displayed above the component |
| `placeholder` | `string` | `'Select an option...'` | Placeholder text |
| `disabled` | `boolean` | `false` | Disable the component |

## Types

```typescript
interface SelectOption {
  id: string
  value: string
}
```

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `SelectOption \| SelectOption[] \| null` | Emitted when selection changes |

## Usage Examples

### Basic Single Select

```vue
<template>
  <CustomSelect
    v-model="selectedFruit"
    :options="fruits"
    label="Choose a fruit"
    placeholder="Select a fruit..."
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CustomSelect from '@/components/ui/CustomSelect.vue'
import type { SelectOption } from '@/types/select'

const fruits = ref<SelectOption[]>([
  { id: '1', value: 'Apple' },
  { id: '2', value: 'Banana' },
  { id: '3', value: 'Cherry' }
])

const selectedFruit = ref<SelectOption | null>(null)
</script>
```

### Multi Select

```vue
<template>
  <CustomSelect
    v-model="selectedFruits"
    :options="fruits"
    :multi="true"
    label="Choose multiple fruits"
    placeholder="Select fruits..."
  />
  
  <!-- Display selected values as comma-separated string -->
  <p>Selected: {{ selectedFruits.map(f => f.value).join(', ') }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CustomSelect from '@/components/ui/CustomSelect.vue'
import type { SelectOption } from '@/types/select'

const fruits = ref<SelectOption[]>([
  { id: '1', value: 'Apple' },
  { id: '2', value: 'Banana' },
  { id: '3', value: 'Cherry' }
])

const selectedFruits = ref<SelectOption[]>([])
</script>
```

### Search Mode (Single)

```vue
<template>
  <CustomSelect
    v-model="selectedCountry"
    :options="countries"
    :search-mode="true"
    label="Search for a country"
    placeholder="Type to search countries..."
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CustomSelect from '@/components/ui/CustomSelect.vue'
import type { SelectOption } from '@/types/select'

const countries = ref<SelectOption[]>([
  { id: 'us', value: 'United States' },
  { id: 'ca', value: 'Canada' },
  { id: 'uk', value: 'United Kingdom' }
])

const selectedCountry = ref<SelectOption | null>(null)
</script>
```

### Search Mode (Multi)

```vue
<template>
  <CustomSelect
    v-model="selectedCountries"
    :options="countries"
    :multi="true"
    :search-mode="true"
    label="Search for multiple countries"
    placeholder="Type to search and select countries..."
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CustomSelect from '@/components/ui/CustomSelect.vue'
import type { SelectOption } from '@/types/select'

const countries = ref<SelectOption[]>([
  { id: 'us', value: 'United States' },
  { id: 'ca', value: 'Canada' },
  { id: 'uk', value: 'United Kingdom' }
])

const selectedCountries = ref<SelectOption[]>([])
</script>
```

## Styling

The component uses Tailwind CSS classes for styling. Key classes include:

- `focus:ring-2 focus:ring-blue-500` - Focus states
- `hover:bg-gray-100` - Hover effects
- `bg-blue-50 text-blue-900` - Selected item styling
- `rounded-md shadow-sm` - Border radius and shadows

You can customize the appearance by modifying the Tailwind classes in the component template.

## Keyboard Navigation

- **Arrow Down/Up**: Open dropdown when closed
- **Enter**: Select first filtered option in search mode
- **Escape**: Close dropdown
- **Tab**: Navigate away from component

## Accessibility

The component includes:

- Proper ARIA attributes
- Semantic HTML structure
- Keyboard navigation support
- Focus management
- Screen reader friendly labels

## Browser Support

- Vue 3.0+
- Modern browsers (Chrome, Firefox, Safari, Edge)
- TypeScript 4.0+

## Demo

A comprehensive demo is available in `CustomSelectDemo.vue` which showcases all the different modes and configurations of the component.

To see the demo, navigate to `/select-demo` in your application.