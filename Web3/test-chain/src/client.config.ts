import { ClientAppChain } from "@proto-kit/sdk";
import runtime from "./runtime";

const appChain = ClientAppChain.fromRuntime(runtime.modules);

appChain.configurePartial({
    Runtime: runtime.config,
    GraphqlClient: {
        url: "url/graphql"
    }
});

export const client = appChain;