export const titleFromPath = () => {
  const url = window.location.href;
  const path = new URL(url).pathname;
  let replaced = path.replace(/-/g, " ").replace(/\//g, "");
  let formatted = replaced
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return formatted;
};

export const replaceName = (str: string) => {
  return str
    .normalize("NFD")
    .toLocaleLowerCase()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/ /g, "-")
    .replace(/[:!@#$%^&*()?;/]/g, "");
};

export class FormatCurrency {
  static VND = new Intl.NumberFormat(`vi-VN`, {
    style: 'currency',
    currency: 'VND',
  });

  static USD = new Intl.NumberFormat(`en-US`, {
    style: 'currency',
    currency: 'USD',
  });
}

export const formatNumber = (num: string) =>
  num.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export const sanitizePayload = <T extends Record<string, any>>(payload: T): T => {
  for (const key in payload) {
    if (payload[key] === undefined) {
      payload[key] = "" as T[typeof key];
    }
  }
  return payload;
}

export const formatSlug = (str: string) => {
  return str
    .normalize('NFD')
    .toLocaleLowerCase()
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/ /g, '-')
    .replace(/[:!@#$%^&*()?;/]/g, '');
};
