<template>
	<div>
		<b-table id="accountList" striped hover :items="items" :fields="fields" responsive>
		<template slot="CreatedAt" slot-scope="data">
      {{ data.item.CreatedAt | timeFormart }}
		</template>
		<template slot="School" slot-scope="data">
      {{ data.item.SchoolID | schoolFormat }}
		</template>
		<template slot="RunDistance" slot-scope="data">
      {{ data.item.RunDistance | DistanceFormat }}
      (预计还需 ?? 天)
		</template>
		<template slot="DistanceRange" slot-scope="data">
      {{ data.item.StartDistance | DistanceFormat }} - {{ data.item.FinishDistance | DistanceFormat }}
      ({{ (data.item.FinishDistance-data.item.StartDistance) | DistanceFormat }})
		</template>
		<template slot="Status" slot-scope="data">
      <span :class="data.item.Status|StatusShowClass">
			{{ data.item.Status | StatusFormat }}
      </span>
		</template>
		<template slot="LastResult" slot-scope="data">
      <span :class="data.item.LastResult|ResultShowClass">
			{{ data.item.LastResult | ResultFormat }}
      </span>
		</template>
		<template slot="LastTime" slot-scope="data">
      {{ data.item.LastTime | timeFormart }}
		</template>
		<template slot="operate" slot-scope="data">
        <AccountListItemOperator :account="data.item" :modal_progress_info.sync="modal_progress_info" :modal_log_info.sync="modal_log_info"/>
		</template>
		</b-table>
        
        <div class="row">
            <div class="col-sm-4">
                <b-button v-b-modal.modal-quickCopy>快速复制</b-button>
            </div>
        </div>
    
		<AccountProgressModal :uid="modal_progress_info.uid" :schoolName="modal_progress_info.schoolID|schoolFormat" :stuNum="modal_progress_info.stuNum"/>
		<AccountLogModal :uid="modal_log_info.uid" :schoolName="modal_log_info.schoolID|schoolFormat" :stuNum="modal_log_info.stuNum"/>
        <AccountQuickCopyModal :accounts="items" />
	</div>
</template>

<script>
import AccountListItemOperator from './AccountListItemOperator.vue'
import AccountProgressModal from './AccountProgressModal.vue'
import AccountLogModal from './AccountLogModal.vue'
import AccountQuickCopyModal from './AccountQuickCopyModal.vue'
import utils from '../utils/utils.js'
export default {
  name: 'AccountList',
  components: {
    AccountListItemOperator,
    AccountProgressModal,
    AccountLogModal,
    AccountQuickCopyModal,
  },
  props: {
    items: {
      type: Array,
      default() {
        return [];
      }
    },
  },
  data: function() {
    return {
      fields: {
        ID: {
          label: '编号',
          sortable: true,
        },
        CreatedAt: {
          label: '创建时间',
          sortable: true,
        },
        School: {
          label: '学校',
          sortable: true,
        },
        StuNum: {
          label: '学号',
          sortable: true,
        },
        RunDistance: {
            label: '每日应跑公里',
        },
        DistanceRange: {
            label: '距离区间',
        },
        Status: {
            label: '执行状态',
        },
        LastResult: {
            label: '上次运行结果',
        },
        LastTime: {
            label: '上次运行时间',
            sortable: true,
        },
        Memo: {
            label: '备注',
        },
        operate: {
            label: '操作',
        },
      },
      modal_progress_info: {},
      modal_log_info: {},
    };
  },
  methods: {
  },
  filters: {
    timeFormart(timeStr) {
      return new Date(timeStr).toLocaleString(undefined,{localeMatcher:"lookup",hour12:false});
    },
    schoolFormat(schoolID) {
        return utils.getSchoolName(schoolID);
    },
    StatusShowClass(raw) {
      const table = {
        normal: "text-secondary",
        pause: "text-secondary",
        running: "text-info",
        finished: "text-primary",
        suspend: "text-danger",
        terminated: "text-dark",
        aborted: "text-dark",
      };
      let formated = table[raw];
      return formated?formated:raw;
    },
    StatusFormat(raw) {
        return utils.getStatusText(raw);
    },
    ResultShowClass(raw) {
      const table = {
        success: "text-success",
        error: "text-danger",
      };
      let formated = table[raw];
      return formated?formated:raw;
    },
    ResultFormat(raw) {
        return utils.getResultText(raw);
    },
	DistanceFormat(raw) {
        return utils.formatDistance(raw);
	},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
