<template>
  <b-row>
    <b-button v-b-modal.modal-progress @click="progressModal">进度</b-button>
    <b-button v-b-modal.modal-log @click="logModal">日志</b-button>
  </b-row>
</template>

<script>
export default {
  name: "AccountListItemOperator",
  props: ["account"],
  methods: {
    progressModal() {
      this.$emit('update:modal_progress_info', {
        uid: this.account.ID,
        schoolID: this.account.SchoolID,
        stuNum: this.account.StuNum
        });
    },
    logModal() {
      this.$emit('update:modal_log_info', {
        uid: this.account.ID,
        schoolID: this.account.SchoolID,
        stuNum: this.account.StuNum
        });
    },
  },
};
</script>