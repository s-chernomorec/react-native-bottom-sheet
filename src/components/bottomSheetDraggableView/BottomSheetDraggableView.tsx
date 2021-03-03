import React, { useMemo, useRef, memo } from 'react';
import isEqual from 'lodash.isequal';
import Animated, { event } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useBottomSheetInternal } from '../../hooks';
import type { BottomSheetDraggableViewProps } from './types';
import { styles } from './styles';

const BottomSheetDraggableViewComponent = ({
  nativeGestureRef,
  gestureType = 'HANDLE',
  style,
  children,
  ...rest
}: BottomSheetDraggableViewProps) => {
  // refs
  const panGestureRef = useRef<PanGestureHandler>(null);

  // hooks
  const {
    enableContentPanningGesture,
    containerTapGestureRef,
    handlePanGestureState,
    handlePanGestureTranslationY,
    handlePanGestureVelocityY,
    contentPanGestureState,
    contentPanGestureTranslationY,
    contentPanGestureVelocityY,
    simultaneousHandlers: _providedSimultaneousHandlers,
    waitFor,
  } = useBottomSheetInternal();

  // variables
  const simultaneousHandlers = useMemo(() => {
    const refs = [containerTapGestureRef];

    if (nativeGestureRef) {
      refs.push(nativeGestureRef);
    }

    if (_providedSimultaneousHandlers) {
      if (Array.isArray(_providedSimultaneousHandlers)) {
        refs.push(..._providedSimultaneousHandlers);
      } else {
        refs.push(_providedSimultaneousHandlers);
      }
    }

    return refs;
  }, [
    _providedSimultaneousHandlers,
    containerTapGestureRef,
    nativeGestureRef,
  ]);

  // styles
  const containerStyle = useMemo(
    () => (style ? [styles.container, style] : styles.container),
    [style]
  );

  // callbacks
  const handleGestureEvent = useMemo(
    () =>
      gestureType === 'CONTENT'
        ? event([
            {
              nativeEvent: {
                state: contentPanGestureState,
                translationY: contentPanGestureTranslationY,
                velocityY: contentPanGestureVelocityY,
              },
            },
          ])
        : event([
            {
              nativeEvent: {
                state: handlePanGestureState,
                translationY: handlePanGestureTranslationY,
                velocityY: handlePanGestureVelocityY,
              },
            },
          ]),
    [
      gestureType,
      contentPanGestureState,
      contentPanGestureTranslationY,
      contentPanGestureVelocityY,
      handlePanGestureState,
      handlePanGestureTranslationY,
      handlePanGestureVelocityY,
    ]
  );

  // effects
  return (
    <PanGestureHandler
      ref={panGestureRef}
      enabled={enableContentPanningGesture}
      simultaneousHandlers={simultaneousHandlers}
      shouldCancelWhenOutside={false}
      waitFor={waitFor}
      onGestureEvent={handleGestureEvent}
      onHandlerStateChange={handleGestureEvent}
    >
      <Animated.View style={containerStyle} {...rest}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

const BottomSheetDraggableView = memo(
  BottomSheetDraggableViewComponent,
  isEqual
);

export default BottomSheetDraggableView;
