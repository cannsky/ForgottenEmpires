import { LocalhostAppChain } from "@proto-kit/cli";
import runtime from "./runtime";

const appChain = LocalhostAppChain.fromRuntime(runtime.modules);

appChain.configurePartial({
    ...appChain.config,
    Runtime: runtime.config,
});

// Proto-kit will make fixes in here
export default appChain as any;