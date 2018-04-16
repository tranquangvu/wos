import _ from 'lodash';

export const transformItem = (item) => ({
  ...item,
  modifierGroups: item.modifierGroups.filter(modifierGroup => {
                        return modifierGroup.modifiers.length > 0
                      }).map(modifierGroup => ({
                        ...modifierGroup,
                        modifiers: modifierGroup.modifiers.map(modifier => ({
                          ...modifier,
                          ...getModifierSpecifyAttrFromGroup(
                            modifierGroup.modifierModifierGroups,
                            modifier.id,
                            modifierGroup.id,
                          )
                        })),
                        modifierModifierGroups: null,
                      })),
})

export const getModifiersFromItem = (item) => {
  return getModifiersFromModifierGroups(item.modifierGroups);
}

export const getModifiersFromModifierGroups = (modifierGroups) => {
  return _.flattenDeep(modifierGroups.map(modifierGroup => modifierGroup.modifiers));
}

const getModifierSpecifyAttrFromGroup = (mmgs, modifierId, modifierGroupId) => {
  let mmg = findMmg(mmgs, modifierId, modifierGroupId);

  if (!mmg) return {};
  let { lowerLimit, upperLimit } = mmg;

  return {
    lowerLimit,
    upperLimit,
  };
}

const findMmg = (mmgs, modifierId, modifierGroupId) => {
  return mmgs.find(mmg => mmg.modifierId === modifierId && mmg.modifierGroupId === modifierGroupId);
}
