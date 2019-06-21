<template>
	<b-modal id="modal-quickCopy" size="lg" title="快速复制" ok-only>
	<div class="container">
        <div class="row">
        <b-form-textarea ref="copyarea" id="textarea-plaintext" plaintext 
        :value="accountQuickCopyText" 
        :rows="this.accounts.length"
        @focus="$event.currentTarget.select()"> // 获得焦点即自动选中文字
        </b-form-textarea>
        </div>
        <div class="row">
            <b-form-checkbox v-model="withrange" value="yes" unchecked-value="">
              显示距离区间
            </b-form-checkbox>
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
        return this.accounts.reduce((result, cur)=>{
            let distance = cur.FinishDistance-cur.StartDistance;
            totalDistance += distance;
            return result
            + utils.getSchoolName(cur.SchoolID) + " | " + cur.StuNum 
            + " | " + this.generateDistanceText(cur.StartDistance, cur.FinishDistance, distance, this.withrange)
            + "\n";
        }, "") + "共计" + this.accounts.length + "个帐号" + totalDistance.toFixed(2) + "公里";
    },
  },
  props: {
    accounts: Array,
    withrange: Boolean,
  },
  data: function() {
    return {};
  },
  filters: {
  },
  methods: {
    generateDistanceText(start, finish, distance, withrange) {
        if (withrange) {
            return start.toFixed(2) + "-" + finish.toFixed(2) + " \t(" + distance.toFixed(2) + ")";
        }
        return distance.toFixed(2);
    },
    clear() {
        this.accounts = [];
    },
  },
}
</script>