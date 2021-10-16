<script lang="ts">
    export let config:Config;
    export let clickCallback:Function;

    interface Config {
        default:string,
        values:string[]
    }

    const body = document.getElementsByTagName('body')[0];
        
    if (!body.hasAttribute('data-select-close')) {
        document.addEventListener("click", closeAllSelect);
        body.setAttribute('data-select-close', '');
    }

    function closeAllSelect(elmnt) {
        var x, y, i, xl, yl, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) { if (elmnt == y[i]) { arrNo.push(i) } else { y[i].classList.remove("select-arrow-active"); } }
        for (i = 0; i < xl; i++) { if (arrNo.indexOf(i)) { x[i].classList.add("select-hide"); } }
    }

    function aHandleClick(e:Event) {
        const target = <HTMLDivElement>e.currentTarget;
        closeAllSelect(target);
        target.nextElementSibling.classList.toggle("select-hide");
        target.classList.toggle("select-arrow-active");
    }

    function eHandleClick(e: Event) {
        const elem = <HTMLElement>e.currentTarget;
        let s = elem.parentElement.parentElement.parentElement.getElementsByTagName("select")[0];
        let sl = s.length;
        let h = elem.parentElement.previousElementSibling;

        for (let i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == elem.innerHTML) {
                s.selectedIndex = i;
                h.innerHTML = elem.innerHTML;

                let y = elem.parentElement.getElementsByClassName("same-as-selected");
                let yl = y.length;
                for (let k = 0; k < yl; k++) {
                    y[k].removeAttribute("class");
                }

                elem.setAttribute("class", "same-as-selected");

                break;
            }
        }

        clickCallback(e);

        (h as HTMLElement).click();
    }
</script>

<div class="custom-select">
    <select>
        <option value="default">{config.default}</option>
        {#each config.values as val}
            <option value="{val.toLowerCase()}">{val}</option>
        {/each}
    </select>
        
    <div class="select-selected" on:click|stopPropagation="{aHandleClick}">{config.default}</div>
    <div class="select-items select-hide">
        {#each config.values as val}
            {#if val == config.default}
                <div id="{val}" class="same-as-selected" on:click|stopPropagation="{eHandleClick}">{val}</div>
            {:else}
                <div id="{val}" on:click|stopPropagation="{eHandleClick}">{val}</div>
            {/if}
        {/each}
    </div>
</div>

<style lang="scss">
	$grey-primary: #252525;
	$grey-primary__hover: rgb(48, 48, 48);
	$grey-secondary: #383838;
    $grey-secondary__hover: rgb(71, 71, 71);
	$font-color: rgb(231, 231, 231);
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);

    .custom-select {
        position: relative;
        font-size: 16px;
        width: 100px;

        select { display: none; }
    }
    .select-selected {
        background-color: $grey-secondary;

        &:after {
            position: absolute;
            content: "";
            top: 7px;
            right: 7px;
            width: 0;
            height: 0;
            border: 5px solid transparent;
            border-color: $font-color transparent transparent transparent;
        }
        &.select-arrow-active:after {
            border-color: transparent transparent $font-color transparent;
            top: 7px;
        }
    }
    .select-items > div div,.select-selected {
        color: $font-color;
        padding: 2px 4px;
        border: 1px solid transparent;
        cursor: pointer;
    }
    .select-items {
        position: absolute;
        background-color: $grey-primary;
        top: 100%;
        left: 0;
        right: 0;
        z-index: 99;

        div:hover { background-color: $grey-primary__hover; cursor: pointer; }
    }
    .select-hide { display: none; }
    .same-as-selected {
        background-color: $grey-primary__hover;
        cursor: pointer;
    }
</style>