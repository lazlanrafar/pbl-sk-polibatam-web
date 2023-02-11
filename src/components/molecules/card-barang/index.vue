<template>
  <div class="card">
    <div class="card-body">
      <div class="d-flex align-items-center pr-sm-10">
        <img
          v-if="type == 'pemasukan'"
          src="@/assets/icon/ic_productin.svg"
          alt="Icon Product In"
        />
        <img
          v-if="type == 'pengeluaran'"
          src="@/assets/icon/ic_productout.svg"
          alt="Icon Product Out"
        />

        <div class="ml-5">
          <p class="text-muted mb-1">{{ type }}</p>
          <p class="h3 mb-0 fw-bold">{{ value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardBarang",
  props: {
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
    },
  },
};
</script>
