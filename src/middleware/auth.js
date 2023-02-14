export default function auth({ next, router }) {
  if (!localStorage.getItem("token")) {
    return router.push("/login");
  }

  return next();
}
