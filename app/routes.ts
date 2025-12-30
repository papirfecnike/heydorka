import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
                index("routes/Home.tsx"), 
                route("speaking", "routes/Speaking.tsx"),
                route("publications", "routes/Publications.tsx"),
                route("testimonials", "routes/Testimonials.tsx"),
                route("cv", "routes/CV.tsx"),
            ] satisfies RouteConfig;