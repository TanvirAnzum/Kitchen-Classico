import React from "react";
import { Helmet } from "react-helmet-async";

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Blog</title>
      </Helmet>
      <div className="w-full min-h-[70vh] flex flex-col ">
        <section className="w-[80%] flex flex-col gap-2 mx-auto my-4">
          <h1 className="text-2xl font-bold text-primary">
            What are differences between SQL and NoSQL?
          </h1>
          <p className="text-lg font-semibold text-secondary">
            Answer:{" "}
            <div className="text-black">
              <p>
                Databases are categorized as Relational Database Management
                System (RDBMS).NoSQL databases are categorized as Non-relational
                or distributed database system.
              </p>
              <p>
                SQL databases have fixed or static or predefined schema.NoSQL
                databases have dynamic schema.
              </p>
              <p>
                SQL databases display data in form of tables so it is known as
                table-based database.NoSQL databases display data as collection
                of key-value pair, documents, graph databases or wide-column
                stores.
              </p>
              <p>
                {" "}
                SQL databases are vertically scalable.NoSQL databases are
                horizontally scalable.
              </p>
            </div>
          </p>
        </section>
        <section className="w-[80%] flex flex-col gap-2 mx-auto my-4">
          <h1 className="text-2xl font-bold text-primary">
            What is JWT, and how does it work?
          </h1>
          <p className="text-lg font-semibold text-secondary">
            Answer:{" "}
            <div className="text-black">
              <p>
                JWT, or JSON Web Token, is an open standard used to share
                security information between two parties — a client and a
                server. Each JWT contains encoded JSON objects, including a set
                of claims. JWTs are signed using a cryptographic algorithm to
                ensure that the claims cannot be altered after the token is
                issued.
              </p>
              <p>
                JWTs differ from other web tokens in that they contain a set of
                claims. Claims are used to transmit information between two
                parties. What these claims are depends on the use case at hand.
                For example, a claim may assert who issued the token, how long
                it is valid for, or what permissions the client has been
                granted. A JWT is a string made up of three parts, separated by
                dots (.), and serialized using base64. In the most common
                serialization format, compact serialization, the JWT looks
                something like this: xxxxx.yyyyy.zzzzz. Once decoded, you will
                get two JSON strings: The header and the payload. The signature.
              </p>
            </div>
          </p>
        </section>
        <section className="w-[80%] flex flex-col gap-2 mx-auto my-4">
          <h1 className="text-2xl font-bold text-primary">
            What is the difference between javascript and NodeJS?
          </h1>
          <p className="text-lg font-semibold text-secondary">
            Answer:{" "}
            <div className="text-black">
              <p>
                Javscript is a high level programming language and node js is
                runtime environment of javasript.
              </p>
            </div>
          </p>
        </section>
        <section className="w-[80%] flex flex-col gap-2 mx-auto my-4">
          <h1 className="text-2xl font-bold text-primary">
            How does NodeJS handle multiple requests at the same time?
          </h1>
          <p className="text-lg font-semibold text-secondary">
            Answer:{" "}
            <div className="text-black">
              <p>
                NodeJS receives multiple client requests and places them into
                EventQueue. NodeJS is built with the concept of event-driven
                architecture. NodeJS has its own EventLoop which is an infinite
                loop that receives requests and processes them. EventLoop is the
                listener for the EventQueue. If NodeJS can process the request
                without I/O blocking then the event loop would itself process
                the request and sends the response back to the client by itself.
                But, it is possible to process multiple requests parallelly
                using the NodeJS cluster module or worker_threads module.
              </p>
            </div>
          </p>
        </section>
      </div>
      ;
    </>
  );
};

export default Blog;
