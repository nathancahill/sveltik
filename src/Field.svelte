<script>
    import { getContext, createEventDispatcher } from 'svelte'
    import { omit } from 'lodash-es'
    import { values, touched, errors, warnings, validators } from './stores'

    const contextHandleInput = getContext('handleInput')
    const contextHandleBlur = getContext('handleBlur')

    const initialErrors = getContext('initialErrors') || {}
    const initialTouched = getContext('initialTouched') || {}
    const initialValues = getContext('initialValues') || {}
    const initialWarnings = getContext('initialWarnings') || {}

    const sveltikBag = getContext('sveltikBag')

    export let as = undefined
    export let type = 'text'
    export let name
    export let multiple = false
    export let validate = undefined

    const dispatch = createEventDispatcher()

    function handleBlur(e) {
        contextHandleBlur(e)
        dispatch('blur', e)
    }

    function handleInput(e) {
        contextHandleInput(e)
        dispatch('input', e)
    }

    $: validators.update(_v => ({ ..._v, [name]: validate }))
</script>

{#if as === 'select'}
    {#if multiple}
        <!-- select multiple does not work with spread props -->
        <!-- https://github.com/sveltejs/svelte/issues/4392 -->
        <select
            name={name}
            multiple
            value={$values[name]}
            on:blur={handleBlur}
            on:input={handleInput}
        >
            <slot></slot>
        </select>
    {:else}
        <select
            name={name}
            {...omit($$props, ['as', 'name', 'validate'])}
            value={$values[name]}
            on:blur={handleBlur}
            on:input={handleInput}
        >
            <slot></slot>
        </select>
    {/if}
{:else if as === 'textarea'}
    <textarea
        name={name}
        {...omit($$props, ['as', 'name', 'validate'])}
        value={$values[name]}
        on:blur={handleBlur}
        on:input={handleInput}
    />
{:else if as === 'checkbox'}
    <input
        name={name}
        type="checkbox"
        checked={$values[name]}
        on:blur={handleBlur}
        on:change={handleInput}
    />
{:else if typeof as === 'object' || typeof as === 'function'}
    <svelte:component
        this={as}
        field={{
            name,
            value: $values[name],
            handleBlur: contextHandleBlur,
            handleInput: contextHandleInput,
        }}
        form={sveltikBag}
        meta={{
            initialError: initialErrors[name],
            initialTouched: initialTouched[name],
            initialValue: initialValues[name],
            initialWarning: initialWarnings[name],
            value: $values[name],
            touched: $touched[name],
            error: $errors[name],
            warning: $warnings[name],
        }}
        props={omit($$props, ['as', 'name', 'validate'])}
    />
{:else}
    <slot
        field={{
            name,
            value: $values[name],
            handleBlur: contextHandleBlur,
            handleInput: contextHandleInput,
        }}
        form={sveltikBag}
        meta={{
            initialError: initialErrors[name],
            initialTouched: initialTouched[name],
            initialValue: initialValues[name],
            initialWarning: initialWarnings[name],
            value: $values[name],
            touched: $touched[name],
            error: $errors[name],
            warning: $warnings[name],
        }}
    >
        {#if type === 'number'}
            <input
                name={name}
                {...omit($$props, ['as', 'name', 'validate'])}
                type="number"
                value={$values[name]}
                on:blur={handleBlur}
                on:input={handleInput}
            />
        {:else}
            <input
                name={name}
                {...omit($$props, ['as', 'name', 'validate'])}
                value={$values[name]}
                on:blur={handleBlur}
                on:input={handleInput}
            />
        {/if}
    </slot>
{/if}
