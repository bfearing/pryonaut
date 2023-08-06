import { siteConfig } from "@/config/site";
import Head from "next/head";

interface MetaProps {
  title: string;
  description: string;
  ogImage: string;
}

const Metadata = ({ meta }: { meta: MetaProps }) => (
  <Head>
    <title>{meta ? meta.title : siteConfig.title}</title>
    <meta
      property="og:title"
      content={meta ? meta.title : siteConfig.title}
      key="title"
    />
    <meta
      name="description"
      content={meta ? meta.description : siteConfig.description}
    />
    <meta
      property="og:image"
      content={meta ? meta.ogImage : siteConfig.ogImage}
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="og:url" content={siteConfig.url} />
  </Head>
);

export default Metadata;
