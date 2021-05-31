import Head from "next/head"


interface Props {
  title?: string,
  description?: string,
  image?: string,
}

const Metatags = (props: Props) => {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@fireship_dev" />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:image" content={props.image} />

      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:image" content={props.image} />

    </Head>
  )
}

export default Metatags
