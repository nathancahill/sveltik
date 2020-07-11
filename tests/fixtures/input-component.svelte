<script>
    export let field
    export let props
</script>

<input
    type="text"
    {...{ name: field.name, value: field.value }}
    {...props}
    on:input={field.handleInput}
    on:blur={field.handleBlur}
/>
