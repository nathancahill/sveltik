<script>
    import { omit, reduce } from 'lodash-es'
    import { errors, touched } from './stores'

    export let name
    export let as = undefined
    const omitted = ['name', 'as']

    $: error = $errors[name]

    function propsToString(p) {
        const s = reduce(
            omit(p, omitted),
            (a, v, k) => typeof v === 'boolean' ? `${a} ${k}`.trim() : `${a} ${k}="${v}"`.trim(),
            ''
        )

        return s ? ` ${s}` : ''
    }
</script>

{#if error && $touched[name]}
    {#if typeof as === 'string'}
        {@html `<${as}${propsToString($$props)}>${error}</${as}>`}
    {:else if typeof as === 'object' || typeof as === 'function'}
        <svelte:component this={as} props={omit($$props, omitted)} msg={error} />
    {:else}
        <slot msg={error}>{error}</slot>
    {/if}
{/if}
