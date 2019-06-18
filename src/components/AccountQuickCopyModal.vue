<template>
	<b-modal id="modal-quickCopy" size="lg" title="快速复制" ok-only @shown="selectCopyAreaText">
	<div class="container">
        <div class="row">
        <b-form-textarea ref="copyarea" id="textarea-plaintext" plaintext 
        :value="accountQuickCopyText" 
        :rows="this.accounts.length"
        @focus="$event.currentTarget.select()"> // 获得焦点即自动选中文字
        </b-form-textarea>
        </div>
    </div>
    </b-modal>
</template>

<script>
import utils from '../utils/utils.js';
export default {
  name: 'AccountQuickCopyModal',
  computed: {
    accountQuickCopyText() {
        let totalDistance = 0.0;
        return this.accounts.reduce(function(result, cur){
            totalDistance += cur.FinishDistance-cur.StartDistance;
            return result+= utils.getSchoolName(cur.SchoolID) + " | " + cur.StuNum + " | "+(cur.FinishDistance-cur.StartDistance).toFixed(2) + "\n";
        }, "") 
        + "共计" + this.accounts.length + "个帐号" + totalDistance.toFixed(2) + "公里";
    },
  },
  props: {
    accounts: Array,
  },
  data: function() {
    return {};
  },
  filters: {
  },
  methods: {
    clear() {
        this.accounts = [];
    },
  },
}
</script>