import {flatPromise} from "@/util";
import {getHeader} from "@/pages/components/header/apis";
import {responseHandler} from "@/assets/js/constants/status-code";
import {SITE_ORIGIN} from "@/util/request";
import {ERROR_403_PAGE_PATH} from "@/pages/error/error-pages-path";

export async function validateSSO() {
  const [err, res] = await flatPromise(getHeader());

  if (err) {
    console.log(err);
    return;
  }

  responseHandler(res)
    .notAuthoritative(() => {
      window.location.replace(`${SITE_ORIGIN}${ERROR_403_PAGE_PATH}?tip=登录后才能访问该页面`);
    });
}
