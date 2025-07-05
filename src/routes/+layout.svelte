<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { themeStore } from '$lib/stores/themeStore';
  import MainLayout from '$lib/components/layout/MainLayout.svelte';
  import NotificationToast from '$lib/components/common/NotificationToast.svelte';
  import ConfirmationModal from '$lib/components/common/ConfirmationModal.svelte';

  // Aplicar o tema ao HTML
  $: if (typeof document !== 'undefined') {
    if ($themeStore === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  onMount(() => {
    // Inicializar o tema
    themeStore.initialize();
  });
</script>

<MainLayout>
  <slot />
</MainLayout>

<!-- Global Components -->
<NotificationToast />
<ConfirmationModal />