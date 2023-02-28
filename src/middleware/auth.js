export default function auth({ next, router }) {
  if (!localStorage.getItem("token")) {
    window.location.reload();
    router.push("/login");
    return;
  }

  return next();
}
