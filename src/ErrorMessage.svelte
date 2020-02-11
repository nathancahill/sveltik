<script>
    import { errors } from './stores'

    export let name
    export let component = undefined

    let error

    const unsubscribe = errors.subscribe(_e => {
        error = _e[name]
    })
</script>

{#if error}
    {#if component === "abbr"}
        <abbr>{error}</abbr>
    {:else if component === "address"}
        <address>{error}</address>
    {:else if component === "article"}
        <article>{error}</article>
    {:else if component === "aside"}
        <aside>{error}</aside>
    {:else if component === "audio"}
        <audio>{error}</audio>
    {:else if component === "b"}
        <b>{error}</b>
    {:else if component === "bdi"}
        <bdi>{error}</bdi>
    {:else if component === "bdo"}
        <bdo>{error}</bdo>
    {:else if component === "blockquote"}
        <blockquote>{error}</blockquote>
    {:else if component === "body"}
        <body>{error}</body>
    {:else if component === "button"}
        <button>{error}</button>
    {:else if component === "canvas"}
        <canvas>{error}</canvas>
    {:else if component === "caption"}
        <caption>{error}</caption>
    {:else if component === "cite"}
        <cite>{error}</cite>
    {:else if component === "code"}
        <code>{error}</code>
    {:else if component === "colgroup"}
        <colgroup>{error}</colgroup>
    {:else if component === "data"}
        <data>{error}</data>
    {:else if component === "datalist"}
        <datalist>{error}</datalist>
    {:else if component === "dd"}
        <dd>{error}</dd>
    {:else if component === "del"}
        <del>{error}</del>
    {:else if component === "details"}
        <details>{error}</details>
    {:else if component === "dfn"}
        <dfn>{error}</dfn>
    {:else if component === "dialog"}
        <dialog>{error}</dialog>
    {:else if component === "div"}
        <div>{error}</div>
    {:else if component === "dl"}
        <dl>{error}</dl>
    {:else if component === "dt"}
        <dt>{error}</dt>
    {:else if component === "em"}
        <em>{error}</em>
    {:else if component === "fieldset"}
        <fieldset>{error}</fieldset>
    {:else if component === "figure"}
        <figure>{error}</figure>
    {:else if component === "footer"}
        <footer>{error}</footer>
    {:else if component === "form"}
        <form>{error}</form>
    {:else if component === "h1"}
        <h1>{error}</h1>
    {:else if component === "head"}
        <head>{error}</head>
    {:else if component === "header"}
        <header>{error}</header>
    {:else if component === "i"}
        <i>{error}</i>
    {:else if component === "ins"}
        <ins>{error}</ins>
    {:else if component === "kbd"}
        <kbd>{error}</kbd>
    {:else if component === "label"}
        <label>{error}</label>
    {:else if component === "legend"}
        <legend>{error}</legend>
    {:else if component === "li"}
        <li>{error}</li>
    {:else if component === "main"}
        <main>{error}</main>
    {:else if component === "map"}
        <map>{error}</map>
    {:else if component === "mark"}
        <mark>{error}</mark>
    {:else if component === "meter"}
        <meter>{error}</meter>
    {:else if component === "nav"}
        <nav>{error}</nav>
    {:else if component === "ol"}
        <ol>{error}</ol>
    {:else if component === "optgroup"}
        <optgroup>{error}</optgroup>
    {:else if component === "option"}
        <option>{error}</option>
    {:else if component === "output"}
        <output>{error}</output>
    {:else if component === "p"}
        <p>{error}</p>
    {:else if component === "picture"}
        <picture>{error}</picture>
    {:else if component === "pre"}
        <pre>{error}</pre>
    {:else if component === "progress"}
        <progress>{error}</progress>
    {:else if component === "q"}
        <q>{error}</q>
    {:else if component === "rp"}
        <rp>{error}</rp>
    {:else if component === "rt"}
        <rt>{error}</rt>
    {:else if component === "ruby"}
        <ruby>{error}</ruby>
    {:else if component === "s"}
        <s>{error}</s>
    {:else if component === "samp"}
        <samp>{error}</samp>
    {:else if component === "script"}
        <script>{error}</script>
    {:else if component === "section"}
        <section>{error}</section>
    {:else if component === "select"}
        <select>{error}</select>
    {:else if component === "small"}
        <small>{error}</small>
    {:else if component === "span"}
        <span>{error}</span>
    {:else if component === "strong"}
        <strong>{error}</strong>
    {:else if component === "style"}
        <style>{error}</style>
    {:else if component === "sub"}
        <sub>{error}</sub>
    {:else if component === "summary"}
        <summary>{error}</summary>
    {:else if component === "sup"}
        <sup>{error}</sup>
    {:else if component === "svg"}
        <svg>{error}</svg>
    {:else if component === "table"}
        <table>{error}</table>
    {:else if component === "tbody"}
        <tbody>{error}</tbody>
    {:else if component === "td"}
        <td>{error}</td>
    {:else if component === "template"}
        <template>{error}</template>
    {:else if component === "textarea"}
        <textarea>{error}</textarea>
    {:else if component === "tfoot"}
        <tfoot>{error}</tfoot>
    {:else if component === "th"}
        <th>{error}</th>
    {:else if component === "thead"}
        <thead>{error}</thead>
    {:else if component === "time"}
        <time>{error}</time>
    {:else if component === "title"}
        <title>{error}</title>
    {:else if component === "tr"}
        <tr>{error}</tr>
    {:else if component === "u"}
        <u>{error}</u>
    {:else if component === "ul"}
        <ul>{error}</ul>
    {:else if component === "var"}
        <var>{error}</var>
    {:else if component === "video"}
        <video>{error}</video>
    {:else if component}
        <svelte:component this={component}>{error}</svelte:component>
    {:else}
        <slot message={error}>{error}</slot>
    {/if}
{/if}
