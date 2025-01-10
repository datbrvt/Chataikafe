/**
 * Node modules
 */

import PropTypes from "prop-types"

/**
 * Components
 */

import UserPrompt from "./UserPrompt"
import AiResponse from "./AiResponse"
import Skeleton from "./Skeleton"

const PromptPreloader = ({promptValue}) => {
  return (
    <div className="mx-auto max-w-[700px]">
        <UserPrompt text={promptValue} />

        <AiResponse>
            <Skeleton />
        </AiResponse>
    </div>
  )
}

PromptPreloader.propTypes = {
    promptValue: PropTypes.string,
}

export default PromptPreloader