import { Mail, Github, Linkedin, Globe, ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export function Contact() {
  return (
    <div className="min-h-screen bg-black text-white pt-20 px-4 sm:px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition mb-8"
        >
          <ArrowLeft className="size-5" />
          Back to Home
        </Link>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Contact Developer
            </h1>
            <p className="text-zinc-400 text-lg">
              Get in touch with the creator of AgFLIX
            </p>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6 sm:p-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="size-16 sm:size-20 rounded-full bg-red-600 flex items-center justify-center text-2xl sm:text-3xl font-bold">
                FJK
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Francis Jipson Kandiado</h2>
                <p className="text-zinc-400">Software Engineer</p>
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-6 space-y-4">
              <h3 className="text-xl font-semibold mb-4">About</h3>
              <p className="text-zinc-300 leading-relaxed">
                Passionate Software Engineer specializing in building modern web applications
                with multiple cutting-edge technologies. With expertise in creating
                intuitive user experiences and scalable backend systems, I bring ideas to life
                through clean code and thoughtful design.
              </p>
            </div>

            <div className="border-t border-zinc-800 pt-6 space-y-4">
              <h3 className="text-xl font-semibold mb-4">Connect</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <a
                  href="mailto:developer@movieflix.com"
                  className="flex items-center gap-3 p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition group"
                >
                  <Mail className="size-6 text-red-600 group-hover:text-red-500" />
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-sm text-zinc-400">Francis.boy.jipson.jnr@gmail.com</div>
                  </div>
                </a>

                <a
                  href="https://github.com/JipsonFrancis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition group"
                >
                  <Github className="size-6 text-red-600 group-hover:text-red-500" />
                  <div>
                    <div className="font-semibold">GitHub</div>
                    <div className="text-sm text-zinc-400">@JipsonFrancis</div>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/franses-kandiado"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition group"
                >
                  <Linkedin className="size-6 text-red-600 group-hover:text-red-500" />
                  <div>
                    <div className="font-semibold">LinkedIn</div>
                    <div className="text-sm text-zinc-400">Francis Jipson</div>
                  </div>
                </a>

                <a
                  href="https://euphonious-maamoul-ac49db.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition group"
                >
                  <Globe className="size-6 text-red-600 group-hover:text-red-500" />
                  <div>
                    <div className="font-semibold">Portfolio</div>
                    <div className="text-sm text-zinc-400">
</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
