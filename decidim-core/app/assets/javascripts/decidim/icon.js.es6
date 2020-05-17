((exports) => {

  /**
   * Generates a Decidim icon element and returns it as a string.
   * @param {String} iconKey - the key of the icon to be generated
   * @param {Object} attributes - extra attributes to define for the icon SVG
   * @param {int} wait - number of milliseconds to wait before executing the function.
   * @private
   * @returns {Void} - Returns nothing.
   */
  exports.Decidim.icon = (iconKey, attributes = {}) => {
    const htmlAttributes = {
      "class": `icon icon--${iconKey}`
    };
    Object.keys(attributes).forEach((key) => {
      // Convert the key to dash-format.
      const newKey = key.replace(/([A-Z])/g, (ucw) => `-${ucw[0].toLowerCase()}`);
      if (typeof htmlAttributes[key] === "undefined") {
        htmlAttributes[newKey] = attributes[key];
      } else {
        htmlAttributes[newKey] = `${htmlAttributes[newKey]} ${attributes[key]}`;
      }
    });

    const iconsPath = exports.Decidim.config.get("icons_path");
    const elHtml = `<svg><use href="${iconsPath}#icon-${iconKey}">`;
    const $el = $(elHtml);
    $el.attr(htmlAttributes);

    return $el[0].outerHTML;
  }
})(window);
