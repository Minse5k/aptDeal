import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import User from "@/views/User.vue";

import store from "@/store/index.js";
const onlyAuthUser = async (to, from, next) => {
  // console.log(store);
  const checkUserInfo = store.getters["userStore/checkUserInfo"];
  const getUserInfo = store._actions["userStore/getUserInfo"];
  let token = sessionStorage.getItem("access-token");
  if (checkUserInfo == null && token) {
    await getUserInfo(token);
  }
  if (checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    next({ name: "user" });
    // router.push({ name: "signIn" });
  } else {
    // console.log("로그인 했다.");
    next();
  }
};

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/user",
      name: "User",
      component: User,
      children: [
        {
          path: "register",
          name: "register",
          component: () => import("@/components/user/UserRegister.vue"),
        },
        {
          path: "login",
          name: "login",
          component: () => import("@/components/user/UserLogin.vue"),
        },
        {
          path: "mypage",
          name: "mypage",
          // beforeEnter: onlyAuthUser,
          component: () => import("@/components/user/UserMyPage.vue"),
        },
        {
          path: "update/:userid",
          name: "userupdate",
          component: () => import("@/components/user/UserUpdate.vue"),
        },
      ],
    },
    {
      path: "/apart",
      name: "apart",
      component: () => import("@/views/Apart.vue"),
      redirect: "/apart/list",
      children: [
        {
          path: "list",
          name: "houselist",
          component: () => import("../components/apart/ApartList.vue"),
        },
        {
          path: "detail",
          name: "housedetail",
          component: () => import("../components/apart/ApartDetail.vue"),
        },
      ],
    },
    {
      path: "/board",
      name: "board",
      component: () => import("@/views/BoardView.vue"),
      redirect: "/board/list",
      children: [
        {
          path: "list",
          name: "boardList",
          component: () => import("@/components/board/BoardList.vue"),
        },
        {
          path: "write",
          name: "boardRegister",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/board/BoardRegister.vue"),
        },
        {
          path: "detail/:articleno",
          name: "boardDetail",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/board/BoardDetail.vue"),
        },
        {
          path: "modify/:articleno",
          name: "boardModify",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/board/BoardModify.vue"),
        },
      ],
    },
    {
      path: "/nego",
      name: "nego",
      component: () => import("@/views/NegoView.vue"),
      redirect: "/nego/list",
      children: [
        {
          path: "list",
          name: "negoList",
          component: () => import("@/components/nego/NegoList.vue"),
        },
        {
          path: "write",
          name: "negoRegister",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/nego/NegoRegister.vue"),
        },
        {
          path: "detail/:articleno",
          name: "negoDetail",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/nego/NegoDetail.vue"),
        },
        {
          path: "modify/:articleno",
          name: "negoModify",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/nego/NegoModify.vue"),
        },
      ],
    },
  ],
});
