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
        return this.accounts.reduce((result, acc)=>{
			let start = acc.StartDistance, finish = acc.FinishDistance;
			// 直接跑满的则按照跑满上限量，多跑的不计入距离。
			// 对于不跑满的则特殊处理，按照实际已跑量计算完成距离。
			if (finish < acc.QualifiedDistance & acc.CurrentDistance > finish) {
				finish = acc.CurrentDistance;
			}
			let withrange = (acc.FinishDistance < acc.QualifiedDistance)?true:this.withrange;
			// 不是从0开始到跑满的，强制开启withrange
			if (acc.StartDistance >0 || acc.FinishDistance < acc.QualifiedDistance) {
				withrange = true;
			}
            let distance = finish-start;
            totalDistance += distance;
            return result
            + utils.getSchoolName(acc.SchoolID) + " | " + acc.StuNum 
            + " | " + this.generateDistanceText(start, finish, distance, withrange)
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
            return distance.toFixed(2) + " \t(" + start.toFixed(2) + "-" + finish.toFixed(2) + ")";
        }
        return distance.toFixed(2);
    },
    clear() {
        this.accounts = [];
    },
  },
}
</script>