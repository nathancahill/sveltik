<script>
    import { getContext } from 'svelte'

    const handleSubmit = getContext('handleSubmit')
    const handleReset = getContext('handleReset')
</script>

<form on:submit|preventDefault={handleSubmit} on:reset|preventDefault={handleReset} {...$$props}>
    <slot />
</form>
