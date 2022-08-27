import Head from "next/head";

export default function Landing({ children }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Head>
        <title>web3rsvp</title>
        <meta
          name="description"
          content="Welcome to xxxx.eth web3 portfolio"
        />
      </Head>
      <section className="py-12">
        <div className="w-full md:w-8/12 text-left">
          <h1 className="text-4xl tracking-tight font-extrabold text-purple-700 sm:text-5xl md:text-6xl">
            <span>Welcome to xxxx.eth web3 portfolio </span>
            {/* <span className="text-indigo-600">metaverse</span> */}
          </h1>
          <p className="mt-3 text-base text-purple-700 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Find web3 education, web3 blogs, and join my communinity!
          </p>
        </div>
      </section>
      <section className="py-12">{children}</section>
    </div>
  );
}
