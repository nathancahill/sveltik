<script>
    import { omit } from 'lodash-es'
    import { errors, touched } from './stores'

    export let name
    export let as = undefined

    $: error = $errors[name]
</script>

{#if error && $touched[name]}
    {#if as === "abbr"}
        <abbr {...omit($$props, ['name', 'as'])}>{error}</abbr>
    {:else if as === "address"}
        <address {...omit($$props, ['name', 'as'])}>{error}</address>
    {:else if as === "article"}
        <article {...omit($$props, ['name', 'as'])}>{error}</article>
    {:else if as === "aside"}
        <aside {...omit($$props, ['name', 'as'])}>{error}</aside>
    {:else if as === "audio"}
        <audio {...omit($$props, ['name', 'as'])}>{error}</audio>
    {:else if as === "b"}
        <b {...omit($$props, ['name', 'as'])}>{error}</b>
    {:else if as === "bdi"}
        <bdi {...omit($$props, ['name', 'as'])}>{error}</bdi>
    {:else if as === "bdo"}
        <bdo {...omit($$props, ['name', 'as'])}>{error}</bdo>
    {:else if as === "blockquote"}
        <blockquote {...omit($$props, ['name', 'as'])}>{error}</blockquote>
    {:else if as === "button"}
        <button {...omit($$props, ['name', 'as'])}>{error}</button>
    {:else if as === "canvas"}
        <canvas {...omit($$props, ['name', 'as'])}>{error}</canvas>
    {:else if as === "caption"}
        <caption {...omit($$props, ['name', 'as'])}>{error}</caption>
    {:else if as === "cite"}
        <cite {...omit($$props, ['name', 'as'])}>{error}</cite>
    {:else if as === "code"}
        <code {...omit($$props, ['name', 'as'])}>{error}</code>
    {:else if as === "colgroup"}
        <colgroup {...omit($$props, ['name', 'as'])}>{error}</colgroup>
    {:else if as === "data"}
        <data {...omit($$props, ['name', 'as'])}>{error}</data>
    {:else if as === "datalist"}
        <datalist {...omit($$props, ['name', 'as'])}>{error}</datalist>
    {:else if as === "dd"}
        <dd {...omit($$props, ['name', 'as'])}>{error}</dd>
    {:else if as === "del"}
        <del {...omit($$props, ['name', 'as'])}>{error}</del>
    {:else if as === "details"}
        <details {...omit($$props, ['name', 'as'])}>{error}</details>
    {:else if as === "dfn"}
        <dfn {...omit($$props, ['name', 'as'])}>{error}</dfn>
    {:else if as === "dialog"}
        <dialog {...omit($$props, ['name', 'as'])}>{error}</dialog>
    {:else if as === "div"}
        <div {...omit($$props, ['name', 'as'])}>{error}</div>
    {:else if as === "dl"}
        <dl {...omit($$props, ['name', 'as'])}>{error}</dl>
    {:else if as === "dt"}
        <dt {...omit($$props, ['name', 'as'])}>{error}</dt>
    {:else if as === "em"}
        <em {...omit($$props, ['name', 'as'])}>{error}</em>
    {:else if as === "fieldset"}
        <fieldset {...omit($$props, ['name', 'as'])}>{error}</fieldset>
    {:else if as === "figure"}
        <figure {...omit($$props, ['name', 'as'])}>{error}</figure>
    {:else if as === "footer"}
        <footer {...omit($$props, ['name', 'as'])}>{error}</footer>
    {:else if as === "form"}
        <form {...omit($$props, ['name', 'as'])}>{error}</form>
    {:else if as === "h1"}
        <h1 {...omit($$props, ['name', 'as'])}>{error}</h1>
    {:else if as === "head"}
        <head {...omit($$props, ['name', 'as'])}>{error}</head>
    {:else if as === "header"}
        <header {...omit($$props, ['name', 'as'])}>{error}</header>
    {:else if as === "i"}
        <i {...omit($$props, ['name', 'as'])}>{error}</i>
    {:else if as === "ins"}
        <ins {...omit($$props, ['name', 'as'])}>{error}</ins>
    {:else if as === "kbd"}
        <kbd {...omit($$props, ['name', 'as'])}>{error}</kbd>
    {:else if as === "label"}
        <label {...omit($$props, ['name', 'as'])}>{error}</label>
    {:else if as === "legend"}
        <legend {...omit($$props, ['name', 'as'])}>{error}</legend>
    {:else if as === "li"}
        <li {...omit($$props, ['name', 'as'])}>{error}</li>
    {:else if as === "main"}
        <main {...omit($$props, ['name', 'as'])}>{error}</main>
    {:else if as === "map"}
        <map {...omit($$props, ['name', 'as'])}>{error}</map>
    {:else if as === "mark"}
        <mark {...omit($$props, ['name', 'as'])}>{error}</mark>
    {:else if as === "meter"}
        <meter {...omit($$props, ['name', 'as'])}>{error}</meter>
    {:else if as === "nav"}
        <nav {...omit($$props, ['name', 'as'])}>{error}</nav>
    {:else if as === "ol"}
        <ol {...omit($$props, ['name', 'as'])}>{error}</ol>
    {:else if as === "optgroup"}
        <optgroup {...omit($$props, ['name', 'as'])}>{error}</optgroup>
    {:else if as === "option"}
        <option {...omit($$props, ['name', 'as'])}>{error}</option>
    {:else if as === "output"}
        <output {...omit($$props, ['name', 'as'])}>{error}</output>
    {:else if as === "p"}
        <p {...omit($$props, ['name', 'as'])}>{error}</p>
    {:else if as === "picture"}
        <picture {...omit($$props, ['name', 'as'])}>{error}</picture>
    {:else if as === "pre"}
        <pre {...omit($$props, ['name', 'as'])}>{error}</pre>
    {:else if as === "progress"}
        <progress {...omit($$props, ['name', 'as'])}>{error}</progress>
    {:else if as === "q"}
        <q {...omit($$props, ['name', 'as'])}>{error}</q>
    {:else if as === "rp"}
        <rp {...omit($$props, ['name', 'as'])}>{error}</rp>
    {:else if as === "rt"}
        <rt {...omit($$props, ['name', 'as'])}>{error}</rt>
    {:else if as === "ruby"}
        <ruby {...omit($$props, ['name', 'as'])}>{error}</ruby>
    {:else if as === "s"}
        <s {...omit($$props, ['name', 'as'])}>{error}</s>
    {:else if as === "samp"}
        <samp {...omit($$props, ['name', 'as'])}>{error}</samp>
    {:else if as === "section"}
        <section {...omit($$props, ['name', 'as'])}>{error}</section>
    {:else if as === "select"}
        <select {...omit($$props, ['name', 'as'])}>{error}</select>
    {:else if as === "small"}
        <small {...omit($$props, ['name', 'as'])}>{error}</small>
    {:else if as === "span"}
        <span {...omit($$props, ['name', 'as'])}>{error}</span>
    {:else if as === "strong"}
        <strong {...omit($$props, ['name', 'as'])}>{error}</strong>
    {:else if as === "sub"}
        <sub {...omit($$props, ['name', 'as'])}>{error}</sub>
    {:else if as === "summary"}
        <summary {...omit($$props, ['name', 'as'])}>{error}</summary>
    {:else if as === "sup"}
        <sup {...omit($$props, ['name', 'as'])}>{error}</sup>
    {:else if as === "svg"}
        <svg {...omit($$props, ['name', 'as'])}>{error}</svg>
    {:else if as === "table"}
        <table {...omit($$props, ['name', 'as'])}>{error}</table>
    {:else if as === "tbody"}
        <tbody {...omit($$props, ['name', 'as'])}>{error}</tbody>
    {:else if as === "td"}
        <td {...omit($$props, ['name', 'as'])}>{error}</td>
    {:else if as === "template"}
        <template {...omit($$props, ['name', 'as'])}>{error}</template>
    {:else if as === "textarea"}
        <textarea {...omit($$props, ['name', 'as'])}>{error}</textarea>
    {:else if as === "tfoot"}
        <tfoot {...omit($$props, ['name', 'as'])}>{error}</tfoot>
    {:else if as === "th"}
        <th {...omit($$props, ['name', 'as'])}>{error}</th>
    {:else if as === "thead"}
        <thead {...omit($$props, ['name', 'as'])}>{error}</thead>
    {:else if as === "time"}
        <time {...omit($$props, ['name', 'as'])}>{error}</time>
    {:else if as === "title"}
        <title {...omit($$props, ['name', 'as'])}>{error}</title>
    {:else if as === "tr"}
        <tr {...omit($$props, ['name', 'as'])}>{error}</tr>
    {:else if as === "u"}
        <u {...omit($$props, ['name', 'as'])}>{error}</u>
    {:else if as === "ul"}
        <ul {...omit($$props, ['name', 'as'])}>{error}</ul>
    {:else if as === "var"}
        <var {...omit($$props, ['name', 'as'])}>{error}</var>
    {:else if as === "video"}
        <video {...omit($$props, ['name', 'as'])}>{error}</video>
    {:else if typeof as === 'object' || typeof as === 'function'}
        <svelte:component this={as} props={omit($$props, ['name', 'as'])} msg={error} />
    {:else}
        <slot msg={error}>{error}</slot>
    {/if}
{/if}
