<script>
    import { getContext } from 'svelte'
    import { values, validators } from './stores'

    const handleInput = getContext('handleInput')
    const handleBlur = getContext('handleBlur')

    export let as = 'input'
    export let type = 'text'
    export let name
    export let multiple = false
    export let validate = undefined

    $: validators.update(_v => ({ ..._v, [name]: validate }))
    $: value = $values[name]
</script>

{#if as === undefined}
<slot {handleInput} {handleBlur} fieldName={name} {value}></slot>
{/if}

{#if as === 'input'}
    {#if type === 'number'}
        <input
            {...$$props}
            type="number"
            {value}
            on:blur={handleBlur}
            on:input={handleInput}
        />
    {:else}
        <input
            {...$$props}
            {value}
            on:blur={handleBlur}
            on:input={handleInput}
        />
    {/if}
{/if}

{#if as === 'select'}
    {#if multiple}
        <!-- select multiple does not work with spread props -->
        <!-- https://github.com/sveltejs/svelte/issues/4392 -->
        <select
            multiple
            {value}
            on:blur={handleBlur}
            on:input={handleInput}
        >
            <slot></slot>
        </select>
    {:else}
        <select
            {...$$props}
            {value}
            on:blur={handleBlur}
            on:input={handleInput}
        >
            <slot></slot>
        </select>
    {/if}
{/if}

{#if as === 'textarea'}
<textarea
    {...$$props}
    {value}
    on:blur={handleBlur}
    on:input={handleInput}
/>
{/if}

{#if as === 'checkbox'}
<input
    type="checkbox"
    checked={value}
    on:blur={handleBlur}
    on:change={handleInput}
/>
{/if}
