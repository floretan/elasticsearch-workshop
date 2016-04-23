'use strict';

const _ = require('highland');
const fs = require('fs');
const elasticsearch = require('elasticsearch');

let client = new elasticsearch.Client({host: 'localhost:9200'});

let indexName = 'openfoodfacts';
let typeName = 'product';

let setupIndex = function() {
  return client.indices.exists({
    index: indexName
  }).then((exists) => {

    if (!exists) {
      // TODO: Create an index if it doesn't exist.
      // return client.indices.create({...})
    }
  }).then(() => {
    // TODO: define the mapping
    // return client.indices.putMapping({...})
  }).catch(console.log);
}

let importData = function(filename) {
  _(fs.createReadStream(filename))
    .split()
    .filter((line) => line.length)
    .map((line) => {
      return line.split('\t')
    })
    .map((parts) => {
      return {
        code: parts[0],
        url: parts[1],
        creator: parts[2],
        // created_t: parts[3],
        created_datetime: parts[4],
        // last_modified_t: parts[5],
        last_modified_datetime: parts[6],
        product_name: parts[7],
        generic_name: parts[8],
        quantity: parts[9],
        packaging: parts[10].split(','),
        packaging_tags: parts[11].split(','),
        brands: parts[12].split(','),
        brands_tags: parts[13].split(','),
        categories: parts[14].split(','),
        categories_tags: parts[15].split(','),
        categories_en: parts[16].split(','),
        origins: parts[17].split(','),
        origins_tags: parts[17].split(','),
        manufacturing_places: parts[18].split(','),
        manufacturing_places_tags: parts[19].split(','),
        labels: parts[20].split(','),
        labels_tags: parts[21].split(','),
        labels_en: parts[22].split(','),
        emb_codes: parts[23].split(','),
        emb_codes_tags: parts[24].split(','),
        first_packaging_code_geo: parts[25],
        cities: parts[26].split(','),
        cities_tags: parts[27].split(','),
        purchase_places: parts[28].split(','),
        stores: parts[29].split(','),
        countries: parts[30].split(','),
        countries_tags: parts[31].split(','),
        countries_en: parts[32].split(','),
        ingredients_text: parts[33],
        allergens: parts[34],
        allergens_en: parts[35],
        traces: parts[36].split(','),
        traces_tags: parts[37].split(','),
        traces_en: parts[38].split(','),
        serving_size: parts[39],
        no_nutriments: parts[40],
        additives_n: parts[41],
        additives: parts[42].split(','),
        additives_tags: parts[43].split(','),
        additives_en: parts[44].split(','),
        ingredients_from_palm_oil_n: parts[45],
        ingredients_from_palm_oil: parts[46],
        ingredients_from_palm_oil_tags: parts[47].split(','),
        ingredients_that_may_be_from_palm_oil_n: parts[48],
        ingredients_that_may_be_from_palm_oil: parts[49],
        ingredients_that_may_be_from_palm_oil_tags: parts[50].split(','),
        pnns_groups_1: parts[53],
        pnns_groups_2: parts[54],
        states: parts[55].split(','),
        states_tags: parts[56].split(','),
        states_en: parts[57].split(','),
        main_category: parts[58].split(','),
        main_category_en: parts[59].split(','),
        image_url: parts[60],
        image_small_url: parts[61],
        nutriments: {
          nutrition_grade_uk: parts[51],
          nutrition_grade_fr: parts[52],
          energy_100g: parts[62],
          energy_from_fat_100g: parts[63],
          fat_100g: parts[64],
          saturated_fat_100g: parts[65],
          butyric_acid_100g: parts[66],
          caproic_acid_100g: parts[67],
          caprylic_acid_100g: parts[68],
          capric_acid_100g: parts[69],
          lauric_acid_100g: parts[70],
          myristic_acid_100g: parts[71],
          palmitic_acid_100g: parts[72],
          stearic_acid_100g: parts[73],
          arachidic_acid_100g: parts[74],
          behenic_acid_100g: parts[75],
          lignoceric_acid_100g: parts[76],
          cerotic_acid_100g: parts[77],
          montanic_acid_100g: parts[78],
          melissic_acid_100g: parts[79],
          monounsaturated_fat_100g: parts[80],
          polyunsaturated_fat_100g: parts[81],
          omega_3_fat_100g: parts[82],
          alpha_linolenic_acid_100g: parts[83],
          eicosapentaenoic_acid_100g: parts[84],
          docosahexaenoic_acid_100g: parts[85],
          omega_6_fat_100g: parts[86],
          linoleic_acid_100g: parts[87],
          arachidonic_acid_100g: parts[88],
          gamma_linolenic_acid_100g: parts[89],
          dihomo_gamma_linolenic_acid_100g: parts[90],
          omega_9_fat_100g: parts[91],
          oleic_acid_100g: parts[92],
          elaidic_acid_100g: parts[93],
          gondoic_acid_100g: parts[94],
          mead_acid_100: parts[95],
          erucic_acid_100g: parts[96],
          nervonic_acid_100g: parts[97],
          trans_fat_100g: parts[98],
          cholesterol_100g: parts[99],
          carbohydrates_100g: parts[100],
          sugars_100g: parts[101],
          sucrose_100g: parts[102],
          glucose_100g: parts[103],
          fructose_100g: parts[104],
          lactose_100g: parts[105],
          maltose_100g: parts[106],
          maltodextrins_100g: parts[107],
          starch_100g: parts[108],
          polyols_100g: parts[109],
          fiber_100g: parts[110],
          proteins_100g: parts[111],
          casein_100g: parts[112],
          serum_proteins_100g: parts[113],
          nucleotides_100g: parts[114],
          salt_100g: parts[115],
          sodium_100g: parts[116],
          alcohol_100g: parts[117],
          vitamin_a_100g: parts[118],
          beta_carotene_100g: parts[119],
          vitamin_d_100g: parts[120],
          vitamin_e_100g: parts[121],
          vitamin_k_100g: parts[122],
          vitamin_c_100g: parts[123],
          vitamin_b1_100g: parts[124],
          vitamin_b2_100g: parts[125],
          vitamin_pp_100g: parts[126],
          vitamin_b6_100g: parts[127],
          vitamin_b9_100g: parts[128],
          vitamin_b12_100g: parts[129],
          biotin_100g: parts[130],
          pantothenic_acid_100g: parts[131],
          silica_100g: parts[132],
          bicarbonate_100g: parts[133],
          potassium_100g: parts[134],
          chloride_100g: parts[135],
          calcium_100g: parts[136],
          phosphorus_100g: parts[137],
          iron_100g: parts[138],
          magnesium_100g: parts[139],
          zinc_100g: parts[140],
          copper_100g: parts[141],
          manganese_100g: parts[142],
          fluoride_100g: parts[143],
          selenium_100g: parts[144],
          chromium_100g: parts[145],
          molybdenum_100g: parts[146],
          iodine_100g: parts[147],
          caffeine_100g: parts[148],
          taurine_100g: parts[149],
          ph_100g: parts[150],
          fruits_vegetables_nuts_100g: parts[151],
          collagen_meat_protein_ratio_100g: parts[152],
          cocoa_100g: parts[153],
          chlorophyl_100g: parts[154],
          carbon_footprint_100g: parts[155],
          nutrition_score_fr_100g: parts[156],
          nutrition_score_uk_100g: parts[157]
        }
      }
    })

    .map((product) => {
      return [
        {index: {_id: product.code}},
        product,
      ]
    })
    .flatten()
    .batch(1000)
    // .tap(console.log)
    .map((bulkQuery) => {
      client.bulk({
        index: 'openfoodfacts',
        type: 'product',
        body: bulkQuery
      })
    })
    .errors(function (err, push) {
      console.error(err);
    })
    .resume();

}

module.exports = {
  indexName: indexName,
  typeName: typeName,
  setupIndex: setupIndex,
  importData: importData,
};