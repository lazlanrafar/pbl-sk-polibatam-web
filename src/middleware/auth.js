export default function auth({ next, router }) {
  if (!localStorage.getItem("token")) {
    router.push("/login");
    return;
  }

  return next();
}
