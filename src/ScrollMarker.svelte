<script>
    import { onMount, getContext } from 'svelte'

    export let name
    let node
    let markers = getContext('markers')

    onMount(() => {
        markers.update(v => ({
            ...v,
            [name]: node,
        }))
    })
</script>

<div style="height: 0;" bind:this="{node}"></div>
