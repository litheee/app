<script setup>
defineProps({
  userName: String
})
</script>

<template>
  <div class="header d-flex a-center">
    <div class="img">
    </div>
    <div class="info">
      <div class="name">
        {{ userName }}
      </div>
      <!-- <div class="seen">
        last seen 5 mins ago
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  height: 56px;
  min-height: 56px;
  padding: 8px 16px;
  background-color: #fff;
  border-bottom: 1px solid #D9DCE0;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
.img {
  min-width: 40px;
  min-height: 40px;
  border-radius: 100px;
  background-color: #8babd8;
  margin-right: 16px;
}
.name {
  font-weight: 600;
}
.seen {
  font-size: 14px;
  color: #707991;
}
</style>
