<template>
    <div id="app">
        <Header
                @show-menu="visible=true"
        />
        <SideMenu
                :visible="visible"
                @hide-menu="visible=false"
        />
        <router-view></router-view>
        <ComparisonCard v-show="!hideComparisonCard"/>
    </div>
</template>

<script>
    import Header from './components/Header.vue'
    import SideMenu from './components/SideMenu.vue'
    import ComparisonCard from "./components/ComparisonCard";

    export default {
        name: 'App',
        data() {
            return {
                visible: false,
                hideComparisonCard: false
            }
        },
        components: {
            ComparisonCard,
            Header,
            SideMenu
        },
        watch: {
            $route (to) {
                this.hideComparisonCard = to.path === '/comparison'
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Montserrat', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        background-color: #F0F1F3;
        height: 100%;
        padding-bottom: 10px;
        min-height: 100vh;
    }

    /* http://meyerweb.com/eric/tools/css/reset/
       v2.0 | 20110126
       License: none (public domain)
    */

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }

    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }

    body {
        line-height: 1;
    }

    ol, ul {
        list-style: none;
    }

    blockquote, q {
        quotes: none;
    }

    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    *, *:after, *:before {
        box-sizing: border-box;
    }
</style>
