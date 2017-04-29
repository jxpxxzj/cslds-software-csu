<template>
    <div class="container">
        <el-row :gutter="20">
            <el-col :span="4">
                <el-menu mode="vertical" default-active="朋辈导师" @select="onSelect">
                    <el-menu-item-group title="学生导师">
                        <el-menu-item index="朋辈导师">朋辈导师</el-menu-item>
                        <el-menu-item index="党员导师">党员导师</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="教师导师">
                        <el-menu-item index="专业导师">专业导师</el-menu-item>
                        <el-menu-item index="成长导师">成长导师</el-menu-item>
                    </el-menu-item-group>
                </el-menu>
                 
            </el-col>
            <el-col :span="20">
                <el-row style="padding-bottom:20px">
                    <div class="title">
                        {{ current.name }}
                        <span class="item"> {{ current.class }} </span>
                        <el-select v-model="current" filterable placeholder="请选择" style="float: right; width:300px;">
                            <el-option v-for="item in teacher" :label="item.name" :value="item" :key="item.id">
                                <span style="float: left">{{ item.name }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.class }}</span>
                            </el-option>
                        </el-select>
                    </div>
                </el-row>
                <el-row :gutter="20">
                    <div v-if="current.image !== ''">
                        <el-col :span="6">
                            <img :src="current.image" style="width: 100%">
                        </el-col>
                        <el-col :span="18">
                            <el-row v-if="current.intro !== ''">
                                <pre style="margin-top:0px">{{ current.intro }}</pre>
                            </el-row>
                            <el-row v-if="current.subject !== null">
                                <el-col :span="6">
                                    辅导方向
                                </el-col>
                                <el-col :span="18">
                                    {{ current.subject }}
                                </el-col>
                            </el-row>
                            <el-row>&nbsp;</el-row>
                            <el-row v-if="current.subject !== null">
                                <el-col :span="6">
                                    联系电话
                                </el-col>
                                <el-col :span="18">
                                    {{ current.phone }}
                                </el-col>
                            </el-row>
                        </el-col>
                    </div>
                    <div v-else style="margin-left: 10px;">
                        <el-row v-if="current.intro !== ''">
                            <pre style="margin-top:0px">{{ current.intro }}</pre>
                        </el-row>
                        <el-row v-if="current.subject !== null">
                            <el-col :span="6">
                                辅导方向
                            </el-col>
                            <el-col :span="18">
                                {{ current.subject }}
                            </el-col>
                        </el-row>
                        <el-row>&nbsp;</el-row>
                        <el-row v-if="current.subject !== null">
                            <el-col :span="6">
                                联系电话
                            </el-col>
                            <el-col :span="18">
                                {{ current.phone }}
                            </el-col>
                        </el-row>
                    </div>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<style scoped>
.title {
    border-bottom: 5px solid #eef1f6;
    padding-bottom: 10px;
    font-weight: 500;
    font-size: 30px;
}
.item {
    font-size: 17px;
    margin-left: 10px;
}
</style>
<script>
export default {
    data() {
        return {
            teacher: [],
            currentType: '朋辈导师',
            current: {

            }
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            this.$axios.get('/teacher/getByType/' + this.currentType)
            .then((response) => {
                this.teacher = response.data;
                this.current = this.teacher[0];
            });
        },
        onSelect(index) {
            this.currentType = index;
            this.fetchData();
        }
    }
};
</script>
