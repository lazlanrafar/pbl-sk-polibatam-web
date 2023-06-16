<template>
  <div class="bg-white border-top py-5 mt-10">
    <div class="container">
      <p class="text-center mb-0 text-muted small">
        Created by
        <a
          href="https://www.instagram.com/jmariani05/"
          target="_blank"
          class="anchor-sosmed"
        >
          Jessica Mariani
        </a>
        ,
        <a
          href="https://www.instagram.com/doput42/"
          target="_blank"
          class="anchor-sosmed"
        >
          Rido Ramadhan
        </a>
        , and
        <a
          href="https://www.instagram.com/lazlanrafar/"
          target="_blank"
          class="anchor-sosmed"
        >
          L Azlan Rafar
        </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppFooter",
  data() {
    return {
      getYear: new Date().getFullYear(),
    };
  },
};
</script>

<style>
.anchor-sosmed {
  color: #183a64 !important;
  font-weight: 500 !important;
  text-decoration: none;
  transition: 0.3s;
}
</style>
