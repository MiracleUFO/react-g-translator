import React, {
  ReactNode,
  ReactElement,
  cloneElement,
  isValidElement,
} from 'react';

import determineRenderedText from '../../utils/determineRenderedText';
import useTranslation from '../../queries/useTranslation';

import { DEFAULT_PROPS } from '../../constants';
import language from '../../types/language';

const TranslationInputImage = ({
  node,
  from,
  to,
  shouldFallback,
}: {
  node: ReactNode;
  from?: language;
  to?: language;
  shouldFallback?: boolean;
}) => {
  if (isValidElement(node)) {
    const isImg = (node.type === 'img' && node.props?.alt as string);
    const isInput = (node.type === 'textarea' || node.type === 'input') && node.props?.placeholder as string;

    if (isImg || isInput) {
      const toBeTranslated = (
        isInput
          ? node.props?.placeholder as string
          : (isImg && node.props?.alt as string)
      ) as string;

      const {
        data,
        isError,
        isLoading,
      } = useTranslation(toBeTranslated, from, to);

      const translatedText = determineRenderedText(
        toBeTranslated,
        data,
        shouldFallback,
        isError,
        isLoading,
      );
      return cloneElement(node as ReactElement, {
        [isInput ? 'placeholder' : 'alt']: translatedText,
      });
    }
    return <>{node}</>;
  }
  return <>{node}</>;
};

TranslationInputImage.defaultProps = DEFAULT_PROPS;

export default TranslationInputImage;
