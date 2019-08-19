const routes = [
  {
    path: "/",
    component: () => import("layouts/Main.vue"),
    children: [
      { name: "Home", path: "", component: () => import("pages/Home.vue") }
    ]
  },
  {
    path: "/posenet",
    component: () => import("layouts/Main.vue"),
    children: [
      {
        name: "PoseNet",
        path: "",
        component: () => import("pages/PoseNet.vue")
      }
    ]
  },
  {
    path: "/posenet/pointer",
    component: () => import("layouts/Main.vue"),
    children: [
      {
        name: "PoseNetPointer",
        path: "",
        component: () => import("pages/PoseNetPointer.vue")
      }
    ]
  },
  {
    path: "/posenet/pointer-dataset-maker",
    component: () => import("layouts/Main.vue"),
    children: [
      {
        name: "PoseNetPointerDatasetMaker",
        path: "",
        component: () => import("pages/PoseNetPointerDatasetMaker.vue")
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
