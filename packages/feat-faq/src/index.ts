export * from "./types";
export * from "./hooks/useFAQs";
export * from "./components";
export { FAQsRepository } from "./repository/faqs.repository";
export { manifest } from "../manifest";
// Next.js App Router route handlers
export { GET as faqGET, GET } from "./api/route";
