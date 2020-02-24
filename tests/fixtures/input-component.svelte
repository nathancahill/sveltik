<script>
    export let field
</script>

<input type="text" {...field} on:input={field.handleInput} on:blur={field.handleBlur} />
