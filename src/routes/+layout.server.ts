import { Constants } from "@fefade/common"
import type { LayoutServerLoad } from "./$types"

export const load = (async () => {
	return {
		title: Constants.ORG_NAME
	}
}) satisfies LayoutServerLoad
