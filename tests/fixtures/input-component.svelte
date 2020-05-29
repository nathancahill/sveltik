<script>
    export let field
    export let props
</script>

<input type="text" {...field} {...props} on:input={field.handleInput} on:blur={field.handleBlur} />
