import { ZapIcon } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="rounded-2xl border border-violet-500/20 bg-[#16111f]/80 backdrop-blur-md shadow-[0_0_30px_rgba(82,39,255,0.15)]">
        <div className="flex flex-col md:flex-row items-center gap-6 p-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-600/20 border border-violet-500/30">
            <ZapIcon className="h-10 w-10 text-violet-400" />
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">
              Rate Limit Reached
            </h3>

            <p className="text-gray-300 mb-2">
              You've made too many requests in a short period.
            </p>

            <p className="text-gray-400">
              Please wait a few seconds before trying again.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;