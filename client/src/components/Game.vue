<template>
    <div :id="containerId" v-if="downloaded" />
    <div class="placeholder" v-else>
        Downloading...
    </div>
</template>

<script>
    export default {
        name: 'Game',
        data: function () {
            return {
                downloaded: false,
                gameInstance: null,
                containerId: 'game-container'
            }
        },
        async mounted() {
            const game = await import('../game/game');
            this.downloaded = true;
            this.$nextTick(() => {
                this.gameInstance = game.launch(this.containerId);
            })
        },
        destroyed() {
            this.gameInstance.destroy(false);
        }
    }
</script>

<style scoped>

</style>