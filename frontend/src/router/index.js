import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import Application from '@/components/Application';
import Admin from '@/components/Admin';
import Material from '@/components/Material';
import Teacher from '@/components/Teacher';
import NotFound from '@/components/NotFound';
import Report from '@/components/Report';
import Research from '@/components/Research';

// Admin
import Introduction from '@/components/admin/Introduction';
import Activity from '@/components/admin/Activity';
import Course from '@/components/admin/Course';
import Apply from '@/components/admin/Apply';
import adminMaterial from '@/components/admin/Material';
import CounselingRoom from '@/components/admin/CounselingRoom';
import adminTeacher from '@/components/admin/Teacher';
import adminResearch from '@/components/admin/Research';
import adminReport from '@/components/admin/Report';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        component: Index
    }, {
        path: '/application',
        component: Application
    }, {
        path: '/admin',
        component: Admin,
        children: [{
            path: 'introduction',
            component: Introduction
        }, {
            path: 'activity',
            component: Activity
        }, {
            path: 'course',
            component: Course
        }, {
            path: 'apply',
            component: Apply
        }, {
            path: 'material',
            component: adminMaterial
        }, {
            path: 'counselingRoom',
            component: CounselingRoom
        }, {
            path: 'teacher',
            component: adminTeacher
        }, {
            path: 'research',
            component: adminResearch
        }, {
            path: 'report',
            component: adminReport
        }]
    }, {
        path: '/material',
        component: Material
    }, {
        path: '/teacher',
        component: Teacher
    }, {
        path: '/research',
        component: Research
    }, {
        path: '/report',
        component: Report
    }, {
        path: '*',
        component: NotFound
    }]
});
