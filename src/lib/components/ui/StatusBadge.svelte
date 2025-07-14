<!-- StatusBadge Temporário -->
<script lang="ts">
  import { Badge } from 'flowbite-svelte';
  
  export const status: string = '';
  export let color: "green" | "red" | "yellow" | "primary" | "blue" | "dark" | "purple" | "indigo" | "pink" | "none";
  export let label: string;
</script>

<Badge {color} class="text-xs rounded-sm">
  {label}
</Badge>