import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext'
import { assets } from '../assets/frontend_assets/assets'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const { products, search, showSearch, loadingProducts } = useContext(ShopContext)
  const [filterProducts, setfilterProducts] = useState([])
  const [category, setcategory] = useState([])
  const [subCategory, setsubCategory] = useState([])
  const [sortType, setsortType] = useState('relavant')
  const [showMobileFilter, setShowMobileFilter] = useState(false)

  const toggleCategory = (val) => {
    setcategory(prev =>
      prev.includes(val) ? prev.filter(i => i !== val) : [...prev, val]
    )
  }

  const toggleSubCategory = (val) => {
    setsubCategory(prev =>
      prev.includes(val) ? prev.filter(i => i !== val) : [...prev, val]
    )
  }

  const applyFilter = () => {
    let copy = products.slice()
    if (showSearch && search) {
      copy = copy.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length > 0) copy = copy.filter(i => category.includes(i.category))
    if (subCategory.length > 0) copy = copy.filter(i => subCategory.includes(i.subCategory))
    setfilterProducts(copy)
  }

  const sortProduct = () => {
    let copy = filterProducts.slice()
    switch (sortType) {
      case 'lowhigh': setfilterProducts(copy.sort((a, b) => a.price - b.price)); break
      case 'highlow': setfilterProducts(copy.sort((a, b) => b.price - a.price)); break
      default: applyFilter(); break
    }
  }

  useEffect(() => { applyFilter() }, [category, subCategory, search, showSearch, products])
  useEffect(() => { sortProduct() }, [sortType])

  const activeCount = category.length + subCategory.length
  const allTags = [...category, ...subCategory]

  const FilterPanel = () => (
    <div className='flex flex-col gap-6'>

      {/* Category */}
      <div>
        <p className='text-xs font-bold text-[#0f172a] uppercase tracking-widest mb-3'>Category</p>
        <div className='flex flex-col gap-1'>
          {['Men', 'Women', 'Kids'].map(cat => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left
                ${category.includes(cat)
                  ? 'bg-[#0f172a] text-white'
                  : 'text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a]'
                }`}
            >
              {cat}
              {category.includes(cat) && <span className='text-xs'>✓</span>}
            </button>
          ))}
        </div>
      </div>

      <div className='w-full h-px bg-[#e2e8f0]' />

      {/* Type */}
      <div>
        <p className='text-xs font-bold text-[#0f172a] uppercase tracking-widest mb-3'>Type</p>
        <div className='flex flex-col gap-1'>
          {['Topwear', 'Bottomwear', 'Winterwear'].map(type => (
            <button
              key={type}
              onClick={() => toggleSubCategory(type)}
              className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left
                ${subCategory.includes(type)
                  ? 'bg-[#0f172a] text-white'
                  : 'text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a]'
                }`}
            >
              {type}
              {subCategory.includes(type) && <span className='text-xs'>✓</span>}
            </button>
          ))}
        </div>
      </div>

      {activeCount > 0 && (
        <>
          <div className='w-full h-px bg-[#e2e8f0]' />
          <button
            onClick={() => { setcategory([]); setsubCategory([]) }}
            className='text-xs font-semibold text-[#ef4444] hover:underline text-left'
          >
            Clear all ({activeCount})
          </button>
        </>
      )}
    </div>
  )

  return (
    <div className='min-h-screen bg-[#f8fafc]'>

      {/* Top Bar */}
      <div className='flex items-center justify-between py-5 border-b border-[#e2e8f0] bg-white px-0 mb-6'>
        <div>
          <h1 className='text-xl font-bold text-[#0f172a]'>
            All Products
            <span className='ml-2 text-sm font-normal text-[#94a3b8]'>({filterProducts.length})</span>
          </h1>
          {allTags.length > 0 && (
            <div className='flex flex-wrap gap-1.5 mt-2'>
              {allTags.map(tag => (
                <span
                  key={tag}
                  onClick={() => {
                    if (category.includes(tag)) toggleCategory(tag)
                    else toggleSubCategory(tag)
                  }}
                  className='flex items-center gap-1 bg-[#0f172a] text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full cursor-pointer hover:bg-[#1e293b] transition-colors'
                >
                  {tag} <span className='opacity-60'>×</span>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className='flex items-center gap-3'>
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilter(true)}
            className='sm:hidden flex items-center gap-2 border border-[#e2e8f0] bg-white px-3 py-2 rounded-lg text-sm font-medium text-[#0f172a]'
          >
            <svg className='w-4 h-4' fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M6 12h12M10 20h4" />
            </svg>
            Filters {activeCount > 0 && <span className='bg-[#0f172a] text-white text-[10px] px-1.5 py-0.5 rounded-full'>{activeCount}</span>}
          </button>

          {/* Sort */}
          <select
            onChange={(e) => setsortType(e.target.value)}
            className='border border-[#e2e8f0] rounded-lg px-3 py-2 text-sm bg-white text-[#0f172a] focus:outline-none focus:border-[#0f172a] cursor-pointer'
          >
            <option value="relavant">Sort: Relevant</option>
            <option value="lowhigh">Price: Low → High</option>
            <option value="highlow">Price: High → Low</option>
          </select>
        </div>
      </div>

      <div className='flex gap-8'>

        {/* Desktop Sidebar */}
        <div className='hidden sm:block w-52 shrink-0'>
          <div className='bg-white border border-[#e2e8f0] rounded-2xl p-5 sticky top-24'>
            <div className='flex items-center gap-2 mb-5 pb-4 border-b border-[#f1f5f9]'>
              <svg className='w-4 h-4 text-[#0f172a]' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M6 12h12M10 20h4" />
              </svg>
              <p className='text-sm font-bold text-[#0f172a]'>Filters</p>
            </div>
            <FilterPanel />
          </div>
        </div>

        {/* Product Grid */}
        <div className='flex-1'>
          {loadingProducts ? (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
              {[...Array(8)].map((_, index) => (
                <div key={index} className='animate-pulse rounded-lg bg-white p-4 border border-[#e2e8f0]'>
                  <div className='h-52 rounded-xl bg-[#e2e8f0]' />
                  <div className='mt-4 h-4 w-3/4 rounded bg-[#e2e8f0]' />
                  <div className='mt-2 h-4 w-1/2 rounded bg-[#e2e8f0]' />
                </div>
              ))}
            </div>
          ) : filterProducts.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-32 bg-white rounded-2xl border border-[#e2e8f0]'>
              <div className='w-14 h-14 bg-[#f1f5f9] rounded-full flex items-center justify-center mb-4'>
                <svg className='w-6 h-6 text-[#94a3b8]' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
                </svg>
              </div>
              <p className='text-[#0f172a] font-semibold'>No products found</p>
              <p className='text-[#94a3b8] text-sm mt-1'>Try adjusting or clearing your filters</p>
              {activeCount > 0 && (
                <button
                  onClick={() => { setcategory([]); setsubCategory([]) }}
                  className='mt-4 text-sm font-semibold text-white bg-[#0f172a] px-5 py-2 rounded-lg hover:bg-[#1e293b] transition-colors'
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
              {filterProducts.map((item, index) => (
                <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilter && (
        <>
          <div
            className='fixed inset-0 bg-black/40 z-50 backdrop-blur-sm'
            onClick={() => setShowMobileFilter(false)}
          />
          <div className='fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-2xl p-6 shadow-2xl max-h-[80vh] overflow-y-auto'>
            <div className='flex items-center justify-between mb-6'>
              <p className='text-base font-bold text-[#0f172a]'>Filters</p>
              <button
                onClick={() => setShowMobileFilter(false)}
                className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f1f5f9] text-[#64748b] text-xl'
              >×</button>
            </div>
            <FilterPanel />
            <button
              onClick={() => setShowMobileFilter(false)}
              className='w-full mt-6 bg-[#0f172a] text-white font-semibold py-3 rounded-xl hover:bg-[#1e293b] transition-colors'
            >
              Show {filterProducts.length} Results
            </button>
          </div>
        </>
      )}

    </div>
  )
}

export default Collection
