<template>
    <div class="container">
        <el-row v-if="!isLogin">
            <el-form :model="loginForm">
                <el-form-item label="管理员账号">
                    <el-input v-model="loginForm.account" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="管理员密码">
                    <el-input v-model="loginForm.password" auto-complete="off" type="password"></el-input>
                </el-form-item>
            </el-form>
            <div class="dialog-footer">
                <el-button type="primary" @click="onLoginClick">登录</el-button>
            </div>
        </el-row>
        <el-row v-if="isLogin">
            <el-row>
                已登录: {{ loginForm.account }} / 刷新页面退出. &nbsp;
                <el-button type="primary" @click="fetchData">重新获取数据</el-button>
            </el-row>
            <el-row>
                <el-tabs>
                    <el-tab-pane label="中心简介">
                        <el-form :model="intro" label-width="80px">
                            <el-form-item label="中心简介">
                                <el-input type="textarea" v-model="intro.introduction"></el-input>
                            </el-form-item>
                            <el-form-item label="章程">
                                <el-input type="textarea" v-model="intro.constitution"></el-input>
                            </el-form-item>
                            <el-form-item label="规章制度">
                                <el-input type="textarea" v-model="intro.rule"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click="onIntroSave">保存编辑</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="活动风采">
                        <el-button type="primary" @click="onActivityAddClick">添加</el-button>
                        <el-row>&nbsp;</el-row>
                        <el-table stripe border :data="activity" style="width: 100%">
                            <el-table-column prop="title" label="标题"></el-table-column>
                            <el-table-column prop="address" label="下载地址">
                                <template scope="scope">
                                    <a :href="scope.row.address">{{ scope.row.address.split('_').slice(1).join('_') }}</a>
                                </template>
                            </el-table-column>
                            <el-table-column label="日期" width="180">
                                <template scope="scope">
                                    {{ new Date(scope.row.date).toLocaleDateString() }}
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="100">
                                <template scope="scope">
                                    <el-button type="text" size="small" @click="onActivityRowClick(scope.$index, scope.row)">编辑</el-button>
                                    <el-button type="text" size="small" @click="onActivityRowDelete(scope.$index, scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="课程通知">
                        <el-button type="primary" @click="onCourseAddClick">添加</el-button>
                        <el-row>&nbsp;</el-row>
                        <el-table stripe border :data="course" style="width: 100%">
                            <el-table-column prop="course" label="标题"></el-table-column>
                            <el-table-column prop="place" label="地点"></el-table-column>
                            <el-table-column label="时间" width="180">
                                <template scope="scope">
                                    {{ new Date(scope.row.time).toLocaleString() }}
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="70">
                                <template scope="scope">
                                    <el-button type="text" size="small" @click="onCourseRowClick(scope.$index, scope.row)">编辑</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="申请">
                        <el-table stripe border :data="apply" style="width: 100%">
                            <el-table-column prop="person" label="申请人" width="180"></el-table-column>
                            <el-table-column prop="type" label="类型" width="180"></el-table-column>
                            <el-table-column prop="detail" label="描述"></el-table-column>
                            <el-table-column prop="time" label="时间" width="180"></el-table-column>
                            <el-table-column label="操作" width="100">
                                <template scope="scope">
                                    <el-button type="text" size="small" @click="onApplyRowClick(scope.$index, scope.row)">回复</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="学习资料">
                        <el-tabs>
                            <el-tab-pane label="文件列表">
                                <el-upload :action="this.baseURL + '/material/upload'" with-credentials :on-success="refreshFileList">
                                    上传新文件:&nbsp;&nbsp;<el-button size="small" type="primary">点击上传</el-button>                            
                                </el-upload>
                                <el-row>&nbsp;</el-row>
                                <el-table stripe border :data="fileList" style="width:100%">
                                    <el-table-column label="文件名">
                                        <template scope="scope">
                                            {{ scope.row }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column width="70" label="操作">
                                        <template scope="scope">
                                            <el-button type="text" size="small" @click="publishFile(scope.$index, scope.row)">发布</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-tab-pane>
                            <el-tab-pane label="已发布资料">
                                <el-table stripe border :data="material" style="width:100%">
                                    <el-table-column label="标题" prop="title"></el-table-column>
                                    <el-table-column label="文件名" prop="address"></el-table-column>
                                    <el-table-column width="180" label="操作">
                                        <template scope="scope">
                                            <el-button type="text" size="small">下载</el-button>
                                            <el-button type="text" size="small" @click="deleteMaterial(scope.$index, scope.row)">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-tab-pane>
                        </el-tabs>
                    </el-tab-pane>
                    <el-tab-pane label="自习室">
                        <el-button type="primary" @click="onRoomAddClick">添加</el-button>
                        <el-row>&nbsp;</el-row>
                        <el-table stripe border :data="room" style="width: 100%">
                            <el-table-column prop="place" label="地点"></el-table-column>
                            <el-table-column label="时间" width="180">
                                <template scope="scope">
                                    {{ new Date(scope.row.time).toLocaleString() }}
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="70">
                                <template scope="scope">
                                    <el-button type="text" size="small" @click="onRoomRowClick(scope.$index, scope.row)">编辑</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="导师介绍">
                        <el-button type="primary" @click="onTeacherAddClick">添加</el-button>
                        <el-row>&nbsp;</el-row>
                        <el-table stripe border :data="teacher" style="width: 100%">
                            <el-table-column type="expand">
                                <template scope="props">
                                    <el-form label-position="left" class="demo-table-expand">
                                        <el-form-item label="介绍">
                                            <span>{{ props.row.intro }}</span>
                                        </el-form-item>
                                        <el-form-item label="图片">
                                            <img :src="props.row.image">
                                        </el-form-item>
                                        <el-form-item label="类别">
                                            <span>{{ props.row.type }}</span>
                                        </el-form-item>
                                        <el-form-item label="班级">
                                            <span>{{ props.row.class }}</span>
                                        </el-form-item>
                                        <el-form-item label="联系方式">
                                            <span>{{ props.row.phone }}</span>
                                        </el-form-item>
                                        <el-form-item label="辅导科目">
                                            <span>{{ props.row.subject }}</span>
                                        </el-form-item>                                              
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="姓名"></el-table-column> 
                            <el-table-column label="操作" width="100">
                                <template scope="scope">
                                    <el-button type="text" size="small" @click="onTeacherRowClick(scope.$index, scope.row)">编辑</el-button>
                                    <el-button type="text" size="small" @click="onTeacherRowDelete(scope.$index, scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-row>
        </el-row>
        <el-dialog title="回复申请" v-model="applyReplyVisible">
            <el-form :model="applyReply">
                <el-form-item label="描述">
                    <el-input v-model="applyReply.detail" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onApplySubmit">提交</el-button>
            </div>
        </el-dialog>
        <el-dialog title="活动编辑" v-model="activityVisible">
            <el-form :model="activityForm">
                <el-form-item label="标题">
                    <el-input v-model="activityForm.title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="文件">
                    <el-upload ref="activityUpload" :action="this.baseURL + '/material/upload'" with-credentials :on-success="onActivityUploadSuccess">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                 <el-form-item label="日期">
                    <el-date-picker v-model="activityForm.date" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onActivitySubmit">提交</el-button>
            </div>
        </el-dialog>
        <el-dialog title="课程编辑" v-model="courseVisible">
            <el-form :model="courseForm">
                <el-form-item label="课程">
                    <el-input v-model="courseForm.course" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="地点">
                    <el-input v-model="courseForm.place" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="时间">
                    <el-date-picker v-model="courseForm.time" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onCourseSubmit">提交</el-button>
            </div>
        </el-dialog>
        <el-dialog title="自习室编辑" v-model="roomVisible">
            <el-form :model="roomForm">
                <el-form-item label="地点">
                    <el-input v-model="roomForm.place" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="时间">
                    <el-date-picker v-model="roomForm.time" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onRoomSubmit">提交</el-button>
            </div>
        </el-dialog>
        <el-dialog title="学习资料编辑" v-model="fileVisible">
            <el-form :model="fileForm">
                <el-form-item label="标题">
                    <el-input v-model="fileForm.title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="文件">
                    <el-input v-model="fileForm.address" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onFileSubmit">提交</el-button>
            </div>
        </el-dialog>
        <el-dialog title="导师编辑" v-model="teacherVisible">
            <el-form :model="teacherForm">
                <el-form-item label="姓名">
                    <el-input v-model="teacherForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="介绍">
                    <el-input type="textarea" v-model="teacherForm.intro" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-input v-model="teacherForm.image" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型"> 
                    <el-select v-model="teacherForm.type" placeholder="请选择">
                        <el-option-group label="学生导师">
                            <el-option label="朋辈导师" value="朋辈导师"></el-option>
                            <el-option label="党员导师" value="党员导师"></el-option>
                        </el-option-group>
                        <el-option-group label="教师导师">
                            <el-option label="专业导师" value="专业导师"></el-option>
                            <el-option label="成长导师" value="成长导师"></el-option>
                        </el-option-group>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级 / 职务">
                    <el-input v-model="teacherForm.class" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="teacherForm.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="辅导科目">
                    <el-input v-model="teacherForm.subject" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onTeacherSubmit">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style scoped>
.table-expand {
  font-size: 0;
}
.table-expand label {
  width: 90px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
<script>
export default {
    data() {
        return {
            loginForm: {
                account: '',
                password: ''
            },
            intro: {
                introduction: '',
                constitution: '',
                rule: ''
            },
            apply: [],
            applyReply: {
                id: 0,
                detail: ''
            },
            applyReplyVisible: false,
            activity: [],
            activityForm: {
                title: '',
                address: '',
                date: ''
            },
            activityVisible: false,
            activityType: 'add',
            course: [],
            courseForm: {
                course: '',
                time: '',
                place: ''
            },
            courseVisible: false,
            courseType: 'add',
            room: [],
            roomForm: {
                place: '',
                time: ''
            },
            roomVisible: false,
            roomType: 'add',
            fileList: [],
            fileForm: {
                title: '',
                address: ''
            },
            material: [],
            fileVisible: false,
            teacherVisible: false,
            teacherType: 'add',
            teacher: [],
            teacherForm: {
                name: '',
                intro: '',
                image: '',
                type: '',
                class: '',
                phone: '',
                subject: ''
            },
            isLogin: false
        };
    },
    methods: {
        onLoginClick() {
            this.$axios.post('/admin/login', this.loginForm)
            .then((response) => {
                if (response.data.code.toString() === '200') {
                    this.isLogin = true;
                    this.fetchData();
                } else if (response.data.code.toString() === '401') {
                    this.$message({
                        type: 'error',
                        message: '登录失败, 请检查用户名和密码'
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: '登录失败, 请检查网络'
                    });
                }
            });
        },
        fetchData() {
            this.$axios.get('/introduction/get')
            .then((response) => {
                this.intro = response.data;
            });

            this.$axios.get('/application/getByState/申请中')
            .then((response) => {
                this.apply = response.data;
            });

            this.$axios.get('/activity/list')
            .then((response) => {
                this.activity = response.data;
            });

            this.$axios.get('/course/list')
            .then((response) => {
                this.course = response.data;
            });

            this.$axios.get('/counselingRoom/list')
            .then((response) => {
                this.room = response.data;
            });

            this.refreshFileList();

            this.$axios.get('/material/list')
            .then((response) => {
                this.material = response.data;
            });

            this.$axios.get('/teacher/list')
            .then((response) => {
                this.teacher = response.data;
            });
        },
        onApplyRowClick(index, row) {
            this.applyReply = row;
            this.applyReplyVisible = true;
        },
        onApplySubmit() {
            this.$axios.post('/application/update', this.applyReply)
            .then((response) => {
                if (response.data.code.toString() === '200') {
                    this.$message({
                        type: 'success',
                        message: '回复成功'
                    });
                    this.$axios.get('/application/getByState/申请中')
                    .then((response2) => {
                        this.apply = response2.data;
                    });
                    this.applyReplyVisible = false;
                } else if (response.data.code.toString() === '401') {
                    this.$message({
                        type: 'error',
                        message: '回复失败, 请检查登录状态'
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: '回复失败, 请检查网络'
                    });
                }
            });
        },
        onActivityAddClick() {
            this.activityVisible = true;
            this.activityType = 'add';
            this.activityForm = {
                title: '',
                address: '',
                date: new Date()
            };
            this.$refs.activityUpload.clearFiles();
        },
        onActivityRowClick(index, row) {
            this.activityVisible = true;
            this.activityForm = row;
            this.activityType = 'update';
            this.$refs.activityUpload.clearFiles();
        },
        onActivityRowDelete(index, row) {
            this.$axios.get('/activity/delete/' + row.id)
            .then((response) => {
                if (response.data.code.toString() === '200') {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                    this.$axios.get('/activity/list')
                    .then((response2) => {
                        this.activity = response2.data;
                    });
                } else if (response.data.code.toString() === '401') {
                    this.$message({
                        type: 'error',
                        message: '删除失败, 请检查登录状态'
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: '删除失败, 请检查网络'
                    });
                }
            });
        },
        onActivitySubmit() {
            if (this.activityType === 'add') {
                this.$axios.post('/activity/add', this.activityForm)
                .then((response) => {
                    if (response.data.code.toString() === '200') {
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                        this.$axios.get('/activity/list')
                        .then((response2) => {
                            this.activity = response2.data;
                            this.activityVisible = false;
                        });
                    } else if (response.data.code.toString() === '401') {
                        this.$message({
                            type: 'error',
                            message: '添加失败, 请检查登录状态'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '添加失败, 请检查网络'
                        });
                    }
                });
            }
            if (this.activityType === 'update') {
                this.$axios.post('/activity/update', this.activityForm)
                .then((response) => {
                    if (response.data.code.toString() === '200') {
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                        this.$axios.get('/activity/list')
                        .then((response2) => {
                            this.activity = response2.data;
                            this.activityVisible = false;
                        });
                    } else if (response.data.code.toString() === '401') {
                        this.$message({
                            type: 'error',
                            message: '修改失败, 请检查登录状态'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '修改失败, 请检查网络'
                        });
                    }
                });
            }
        },
        onCourseAddClick() {
            this.courseVisible = true;
            this.courseType = 'add';
            this.courseForm = {
                course: '',
                time: new Date(),
                place: ''
            };
        },
        onCourseRowClick(index, row) {
            this.courseVisible = true;
            this.courseForm = row;
            this.courseType = 'update';
        },
        onRoomAddClick() {
            this.roomVisible = true;
            this.roomType = 'add';
            this.roomForm = {
                place: '',
                time: new Date()
            };
        },
        onRoomRowClick(index, row) {
            this.roomVisible = true;
            this.roomForm = row;
            this.roomType = 'update';
        },
        onRoomSubmit() {
            if (this.roomType === 'add') {
                this.$axios.post('/counselingRoom/add', this.roomForm)
                .then((response) => {
                    if (response.data.code.toString() === '200') {
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                        this.$axios.get('/counselingRoom/list')
                        .then((response2) => {
                            this.room = response2.data;
                            this.roomVisible = false;
                        });
                    } else if (response.data.code.toString() === '401') {
                        this.$message({
                            type: 'error',
                            message: '添加失败, 请检查登录状态'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '添加失败, 请检查网络'
                        });
                    }
                });
            }
            if (this.roomType === 'update') {
                this.$axios.post('/counselingRoom/update', this.roomForm)
                .then((response) => {
                    if (response.data.code.toString() === '200') {
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                        this.$axios.get('/counselingRoom/list')
                        .then((response2) => {
                            this.room = response2.data;
                            this.roomVisible = false;
                        });
                    } else if (response.data.code.toString() === '401') {
                        this.$message({
                            type: 'error',
                            message: '修改失败, 请检查登录状态'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '修改失败, 请检查网络'
                        });
                    }
                });
            }
        },
        onCourseSubmit() {
            if (this.courseType === 'add') {
                this.$axios.post('/course/add', this.courseForm)
                .then((response) => {
                    if (response.data.code.toString() === '200') {
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                        this.$axios.get('/course/list')
                        .then((response2) => {
                            this.course = response2.data;
                            this.courseVisible = false;
                        });
                    } else if (response.data.code.toString() === '401') {
                        this.$message({
                            type: 'error',
                            message: '添加失败, 请检查登录状态'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '添加失败, 请检查网络'
                        });
                    }
                });
            }
            if (this.courseType === 'update') {
                this.$axios.post('/course/update', this.courseForm)
                .then((response) => {
                    if (response.data.code.toString() === '200') {
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                        this.$axios.get('/course/list')
                        .then((response2) => {
                            this.course = response2.data;
                            this.courseVisible = false;
                        });
                    } else if (response.data.code.toString() === '401') {
                        this.$message({
                            type: 'error',
                            message: '修改失败, 请检查登录状态'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '修改失败, 请检查网络'
                        });
                    }
                });
            }
        },
        refreshFileList() {
            this.$axios.get('/material/listFile')
            .then((response) => {
                this.fileList = response.data;
            });
        },
        publishFile(index, row) {
            this.fileVisible = true;
            this.fileForm = {
                title: '',
                address: row
            };
        },
        onFileSubmit() {
            this.$axios.post('/material/add', this.fileForm)
            .then((response) => {
                if (response.data.code.toString() === '200') {
                    this.$message({
                        type: 'success',
                        message: '发布成功'
                    });
                    this.$axios.get('/material/list')
                    .then((response2) => {
                        this.material = response2.data;
                        this.fileVisible = false;
                    });
                } else if (response.data.code.toString() === '401') {
                    this.$message({
                        type: 'error',
                        message: '发布失败, 请检查登录状态'
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: '发布失败, 请检查网络'
                    });
                }
            });
        },
        deleteMaterial(index, row) {
            this.$axios.get('/material/delete/' + row.id)
            .then((response) => {
                if (response.data.code.toString() === '200') {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                    this.$axios.get('/material/list')
                    .then((response2) => {
                        this.material = response2.data;
                    });
                } else if (response.data.code.toString() === '401') {
                    this.$message({
                        type: 'error',
                        message: '删除失败, 请检查登录状态'
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: '删除失败, 请检查网络'
                    });
                }
            });
        },
        onTeacherAddClick() {
            this.teacherVisible = true;
            this.teacherType = 'add';
            this.teacherForm = {
                name: '',
                intro: '',
                image: ''
            };
        },
        onTeacherRowClick(index, row) {
            this.teacherVisible = true;
            this.teacherForm = row;
            this.teacherType = 'update';
        },
        onTeacherRowDelete(index, row) {
            this.$axios.get('/teacher/delete/' + row.id)
            .then((response) => {
                if (response.data.code.toString() === '200') {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                    this.$axios.get('/teacher/list')
                    .then((response2) => {
                        this.teacher = response2.data;
                    });
                } else if (response.data.code.toString() === '401') {
                    this.$message({
                        type: 'error',
                        message: '删除失败, 请检查登录状态'
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: '删除失败, 请检查网络'
                    });
                }
            });
        },
        onTeacherSubmit() {
            if (this.teacherType === 'add') {
                this.$axios.post('/teacher/add', this.teacherForm)
                .then((response) => {
                    if (response.data.code.toString() === '200') {
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                        this.$axios.get('/teacher/list')
                        .then((response2) => {
                            this.teacher = response2.data;
                            this.teacherVisible = false;
                        });
                    } else if (response.data.code.toString() === '401') {
                        this.$message({
                            type: 'error',
                            message: '添加失败, 请检查登录状态'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '添加失败, 请检查网络'
                        });
                    }
                });
            }
            if (this.teacherType === 'update') {
                this.$axios.post('/teacher/update', this.teacherForm)
                .then((response) => {
                    if (response.data.code.toString() === '200') {
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                        this.$axios.get('/teacher/list')
                        .then((response2) => {
                            this.teacher = response2.data;
                            this.teacherVisible = false;
                        });
                    } else if (response.data.code.toString() === '401') {
                        this.$message({
                            type: 'error',
                            message: '修改失败, 请检查登录状态'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '修改失败, 请检查网络'
                        });
                    }
                });
            }
        },
        onActivityUploadSuccess(response) {
            this.activityForm.address = '/file/' + response.path;
        },
        onIntroSave() {
            this.$axios.post('/introduction/update', this.intro)
            .then((response) => {
                if (response.data.code.toString() === '200') {
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    });
                } else if (response.data.code.toString() === '401') {
                    this.$message({
                        type: 'error',
                        message: '修改失败, 请检查登录状态'
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: '修改失败, 请检查网络'
                    });
                }
            });
        }
    }
};
</script>
